/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./App.css";
import Results from "./results";


class Historic extends Component {
  constructor (props) {
    super(props);
    this.state = {
      historic: [],
      index: 0
    };
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

  render () {
    let results = null;
    if (this.state.historic.length > 0) {
      results = (<Results winner={this.state.historic[this.state.index].winner}
        fightersWithLikes={this.state.historic[this.state.index].fightersWithLikes}
        restart={() => {this.props.restart();}} />);
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
