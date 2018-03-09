/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Col, Alert } from "reactstrap";
import "./App.css";

class Fighter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      player: []
    };
  }

  render () {
    return (
      <Col sm="4">
        <Card className="SpacingCards">
          <CardBody className={this.props.fighter.user.is_private ? "CannotPlay" : "CanPlay"}>
            <Alert color="danger" isOpen={this.props.fighter.user.is_private}>
              <p>Sorry this account is private, this user cannot fight</p>
            </Alert>
            <CardTitle>User name {this.props.fighter.user.full_name}</CardTitle>
            <CardSubtitle>Number of followers : {this.props.fighter.user.followed_by.count}</CardSubtitle>
          </CardBody>
          <CardImg width="50px" src={this.props.fighter.user.profile_pic_url_hd}
            alt={"picture profile " + this.props.fighter.user.full_name} />
        </Card>
      </Col>
    );
  }
}

export default Fighter;
