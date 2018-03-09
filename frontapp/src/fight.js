/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import update from "react-addons-update";
import "./App.css";


class Fight extends Component {
  constructor (props) {
    super(props);
    this.state = {
      winner: { likes: 0 },
      fightersWithLikes: []
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
    this.beginFight = this.beginFight.bind(this);
    this.likesCalculator = this.likesCalculator.bind(this);
  }

  componentDidMount () {
    let resp = this.props.fighters.map((f) => {
      let likes = this.likesCalculator(f.user);
      let event = new Date();
      let fighter = { date: event.toISOString(), username: f.user.username, likes: likes,
        full_name: f.user.full_name, pic_url: f.user.profile_pic_url_hd };
      if (fighter.likes > this.state.winner.likes) {
        this.setState({ winner: fighter });
      }
      return fighter;
      //this.setState({ fightersWithLikes: newArray });
    });
    this.setState({ fightersWithLikes: resp });
  }

  likesCalculator (user) {
    let likes = user.media.nodes.map((f) => {
      return f.likes.count;
    });
    console.log(likes.reduce((accumulator, currentValue) => accumulator + currentValue));
    return likes.reduce((accumulator, currentValue) => accumulator + currentValue);
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
        <Row className="Spacing">
          <Button onClick={this.beginFight}>Let's the figth begin</Button>
          <Button onClick={this.props.restart}>Go back</Button>
        </Row>
        <Row className="Spacing">
          {this.state.fightersWithLikes.map((f) => {
            return (<p key ={f.pic_url}>{"u" + f.username + " likes " + f.likes}</p>);
          })}
          <p>{"ganador:" + this.state.winner.username}</p>
        </Row>
      </Col>
    );
  }
}

export default Fight;
