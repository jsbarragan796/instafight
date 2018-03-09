/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./App.css";
import Resultsh from "./resultsH";


class Historic extends Component {
  constructor (props) {
    super(props);
    this.state = {
      historic: [],
      index: 0
    };
    this.next = this.next.bind(this);
  }

  componentDidMount () {
    fetch("api/fightsrecords")
      .then((res) => {
        return res.json();
      })
      .then((historic) => {
        this.setState({ historic: historic });
      })
      .catch((err) => console.log(err));
  }

  next () {
    if ((this.state.index + 1) < this.state.historic.length) {
      this.setState({ index: Number(this.state.index + 1) });
    } else {
      this.setState({ index: 0 });
    }
  }

  render () {
    let results = null;
    if (this.state.historic.length > 0) {
      results = (<Resultsh winner={this.state.historic[this.state.index].winner}
        fightersWithLikes={this.state.historic[this.state.index].fightersWithLikes}
        restart={() => {this.props.restart();}} next={this.next} />);
    }
    return (
      <Col className="Spacing">
        <Row className="Spacing">
          {results}
        </Row>
      </Col>
    );
  }
}

export default Historic;
