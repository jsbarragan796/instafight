/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Row, Col, Alert } from "reactstrap";
import update from "react-addons-update";
import "./App.css";
import Fighter from "./fighter";

class Fighters extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      privatedUsers: []
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
    this.beginFight = this.beginFight.bind(this);
  }
  beginFight () {
    let privatedUsers = this.props.fighters.filter((f) => {
      if (f.user.is_private) {
        const newArray = update(this.state.privatedUsers, { $push: [f.user.username] });
        this.setState({ privatedUsers: newArray });
        return f;
      }
    });
    if (this.props.fighters.length - privatedUsers.length < 2) {
      this.onMostrar();
    } else {
      this.props.startFight();
    }
  }

  onMostrar () {
    this.setState({ visible: true });
  }

  onDismiss () {
    this.setState({ visible: false });
  }
  render () {
    return (
      <Col className="Spacing">
        <Row>
          <h1>Loaded contestants</h1>
        </Row>
        <Row>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            <h6>"It is needed to have more than 2 public accounts, to start  the fight."</h6>
          </Alert>
        </Row>
        <Row className="Spacing">
          <Button onClick={this.beginFight}>Let's the figth begin</Button>
          <Button onClick={this.props.restart}>Go back</Button>
        </Row>

        <Row className="Spacing">
          {this.props.fighters.map((f) => {
            return (<Fighter key ={f.user.id} fighter = {f} />);
          })}
        </Row>
      </Col>
    );
  }
}

export default Fighters;
