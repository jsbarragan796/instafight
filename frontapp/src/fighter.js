/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Col } from "reactstrap";
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
      <Col sm="6">
        <Card>
          <CardBody>
            <CardTitle>Full_name {this.props.fighter.user.full_name}</CardTitle>
            <CardSubtitle>Followers : {this.props.fighter.user.followed_by.count}</CardSubtitle>
          </CardBody>
          <CardImg width="100px" src={this.props.fighter.user.profile_pic_url_hd}
            alt={"picture profile " + this.props.fighter.user.full_name} />
        </Card>
      </Col>
    );
  }
}

export default Fighter;
