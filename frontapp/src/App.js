import React, { Component } from "react";
import logo from "./logo.svg";
import { Button, Label, Input, Form, FormGroup, Row } from "reactstrap";
import "./App.css";
import Fighter from "./fighter";

class App extends Component {
  constructor (props) {
    super(props);
    this.findfighters = this.findfighters.bind(this);
    this.setFighter2 = this.setFighter2.bind(this);
    this.setFighter1 = this.setFighter1.bind(this);
    this.state = {
      fighter1: "",
      fighter2: "",
      play1: [],
      play2: []
    };
  }

  findfighters () {
    console.log("https://www.instagram.com/" + this.state.fighter1 + "/?__a=1");
    fetch("https://www.instagram.com/" + this.state.fighter1 + "/?__a=1")
      .then((res) => {
        return res.json();
      })
      .then((play1) => {
        this.setState({ play1: play1 });
      })
      .catch((err) => console.log(err));

    fetch("https://www.instagram.com/" + this.state.fighter2 + "/?__a=1")
      .then((res) => {
        return res.json();
      })
      .then((play2) => {
        this.setState({ play2: play2 });
      })
      .catch((err) => console.log(err));
  }

  //login
  setFighter1 (e) {
    this.setState({ fighter1: e.target.value });
  }

  setFighter2 (e) {
    this.setState({ fighter2: e.target.value });
  }


  render () {
    let fighters1 = null;
    let fighters2 = null;
    if (this.state.play1.length > 0 && this.state.play2.length > 0) {
      fighters1 = (<Fighter fighter = {this.state.play1}/>);
      fighters2 = (<Fighter fighter = {this.state.play2}/>);
    }

    return (
      <div className="App">
        <header >
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Form >
            <FormGroup>
              <Label >Fighter 1</Label>
              <Input name="correo" id="fighter1" placeholder="duto_guerra"
                value={this.state.fighter1} onChange={this.setFighter1}/>
            </FormGroup>
            <FormGroup>
              <Label >Fighter 2</Label>
              <Input name="correo" id="fighter2" placeholder="jusebarjer"
                value={this.state.fighter2} onChange={this.setFighter2}/>
            </FormGroup>
            <Button onClick={this.findfighters}>Fight !!!!</Button>
          </Form>
        </div>
        <Row>
          {fighters1}
          {fighters2}
        </Row>
      </div>
    );
  }
}

export default App;
