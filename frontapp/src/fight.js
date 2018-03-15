/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./App.css";
import Results from "./results";

class Fight extends Component {
  constructor (props) {
    super(props);
    this.state = {
      winner: { likes: 0 },
      fightersWithLikes: []
    };
    this.likesCalculator = this.likesCalculator.bind(this);
    this.saveFight = this.saveFight.bind(this);
  }

  componentDidMount () {
    let resp = this.props.fighters.map((f) => {
      let likes = this.likesCalculator(f.user);
      let event = new Date();
      let fighter = { date: event.toISOString(), username: f.user.username, likes: likes,
        full_name: f.user.full_name, pic_url: f.user.profile_pic_url_hd };
      Promise.all([likes, event, fighter]).then(() => {
        if (Number(fighter.likes) > this.state.winner.likes) {
          this.setState({ winner: fighter });
        }
      });
      return fighter;
    }
    );
      //this.setState({ fightersWithLikes: newArray });
    Promise.all([resp]).then(() => {
      this.setState({ fightersWithLikes: resp });
      this.saveFight();
    });
  }
  saveFight () {
    let data = { winner: this.state.winner, fightersWithLikes: this.state.fightersWithLikes };
    fetch("api/addfight", { method: "POST", body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        console.log("Fight save");
      })
      .catch((err) => {
        console.log(err);
      }
      );
  }

  likesCalculator (user) {
    let likes = user.edge_owner_to_timeline_media.edges.map((f) => {
      return f.node.edge_liked_by.count;
    });
    console.log(likes.reduce((accumulator, currentValue) => accumulator + currentValue));
    return likes.reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  render () {
    return (
      <Col className="Spacing">
        <Row className="Spacing">
          <Results winner={this.state.winner}
            fightersWithLikes={this.state.fightersWithLikes} restart={() => {this.props.restart();}} />
        </Row>
      </Col>
    );
  }
}

export default Fight;
