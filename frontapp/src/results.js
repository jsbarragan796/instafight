/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Row, Col, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import "./App.css";


class Results extends Component {
  render () {
    return (
      <Col className="Spacing">
        <Row>
          <Col ms="3"/>
          <Col ms="8">
            <h1>The winner is: {this.props.winner.username}</h1>
          </Col>
          <Col ms="2">
            <Button onClick={this.props.restart}>Go back</Button>
          </Col>
        </Row>
        <Row className="Spacing">
          <Col sm="3"/>
          <Col sm="4">
            <Card className="SpacingCards">
              <CardBody className="Winner">
                <CardTitle>{"User name " + this.props.winner.full_name}</CardTitle>
                <p> {"Total Likes " + this.props.winner.likes}</p>
                <p> {"Date contest " + this.props.winner.date}</p>
                <Button onClick={this.props.restart}>View profile</Button>
              </CardBody>
              <CardImg src={this.props.winner.pic_url}
                alt={"picture profile " + this.props.winner.full_name} />
            </Card>
          </Col>
          <Col sm="3"/>
        </Row>
        <Row className="Spacing">
          <h1>Total contestants: {this.props.fightersWithLikes.length}</h1>
        </Row>
        <Row className="Spacing">
          {this.props.fightersWithLikes.map((f) => {
            return (
              <Col sm="4">
                <Card className="SpacingCards">
                  <CardBody className="CanPlay">
                    <CardTitle>{"User name " + f.full_name}</CardTitle>
                    <p> {"Total Likes " + f.likes}</p>
                  </CardBody>
                  <CardImg src={f.pic_url}
                    alt={"picture profile " + f.full_name} />
                </Card>
              </Col>);
          })}
        </Row>
      </Col>
    );
  }
}
export default Results;
