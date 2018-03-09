/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, Col } from "reactstrap";
import "./App.css";

class Fighter extends Component {
  render () {
    return (
      <Col sm="4">
        <Card className="SpacingCards">
          <CardBody className={this.props.fighter.user.is_private ? "CannotPlay" : "CanPlay"}>
            <CardTitle>{"User name " + this.props.fighter.user.full_name}</CardTitle>
            {(this.props.fighter.user.is_private) ? <p>private account</p> : null}
            <p> {"followers " + this.props.fighter.user.followed_by.count}</p>
            <p> {"follows " + this.props.fighter.user.follows.count}</p>
          </CardBody>
          <CardImg src={this.props.fighter.user.profile_pic_url_hd}
            alt={"picture profile " + this.props.fighter.user.full_name} />
        </Card>
      </Col>
    );
  }
}

export default Fighter;
