import React, { Component } from "react";
import banner from "./banner.png";
import update from "react-addons-update";
import { Button, Label, Input, Form, FormGroup, Row, FormFeedback, Col } from "reactstrap";
import "./App.css";
import Fighters from "./fighters";
import Fight from "./fight";
import Footer from "./footer";
import Historic from "./historic";


class App extends Component {
  constructor (props) {
    super(props);
    this.findfighter = this.findfighter.bind(this);
    this.addField = this.addField.bind(this);
    this.setFighter = this.setFighter.bind(this);
    this.deleteField = this.deleteField.bind(this);
    this.restart = this.restart.bind(this);
    this.startFight = this.startFight.bind(this);
    this.startHistoric = this.startHistoric.bind(this);
    this.state = {
      fighters: [],
      fields: [{ id: 0, field: "", invalid: false }, { id: 1, field: "", invalid: false }],
      fightStarted: false,
      historic: false
    };
  }
  findfighter () {
    this.state.fields.map((f) => {
      fetch("https://www.instagram.com/" + f.field + "/?__a=1")
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        }).then((fighter) => {
        //  let fightersTemp = this.state.fighters;
          const newArray = update(this.state.fighters, { $push: [fighter] });
          //  fightersTemp.push(fighter);
          this.setState({ fighters: newArray });
        })
        .catch((err) => this.reportError(f.id));
    });
  }


  //restart
  startFight () {
    this.setState({ fightStarted: true });
  }

  //restart
  startHistoric () {
    this.setState({ historic: true });
  }

  //delete field for more accounts
  restart () {
    this.setState({ fields: [{ id: 0, field: "", invalid: false }, { id: 1, field: "", invalid: false }] });
    this.setState({ fighters: [] });
    this.setState({ fightStarted: false });
    this.setState({ historic: false });
  }
  //add field for more accounts
  addField () {
    let index = this.state.fields.length;
    const newArray = update(this.state.fields, { $push: [{ id: Number(index), field: "", invalid: false }] });
    this.setState({
      fields: newArray
    });
  }
  //delete field for more accounts
  deleteField () {
    let index = this.state.fields.length - 1;
    const newArray = this.state.fields.filter((f) => {
      return f.id !== index;
    });
    this.setState({ fields: newArray });
  }


  // error when the account name do not exist
  reportError (id) {
    const fieldsTemp = this.state.fields.map((f) => {
      if (f.id !== id) return f;
      return { id: f.id, field: f.field, invalid: true };
    });
    this.setState({ fields: fieldsTemp });
  }

  //set the fighter name in fields
  setFighter (e) {
    const fieldsTemp = this.state.fields.map((f) => {
      if (f.id !== Number(e.target.id)) return f;
      return { id: f.id, field: e.target.value, invalid: false };
    });
    this.setState({ fields: fieldsTemp });
  }

  render () {
    let fields = null;
    if (this.state.fighters.length === 0) {
    //Fields to users accounts
      fields = (<Form >{this.state.fields.map((p) => {
        return (<FormGroup key ={p.id}>
          <Label className="Font">Fighter {" " + (p.id + 1)}</Label>
          <Input name={"fighter" + p.id} id={p.id} placeholder="jusebarjer"
            value={p.field} onChange={this.setFighter} invalid={p.invalid}/>
          <FormFeedback invalid>Sorry, this Instagram account do not exist</FormFeedback>
        </FormGroup>);
      })}
      <Button onClick={this.addField}>Add more accounts</Button>
      {(this.state.fields.length > 2) ? <Button onClick={this.deleteField}>delete Field</Button> : null}
      <Button onClick={this.findfighter}>Load the contestants </Button>
      <Button onClick={this.startHistoric}> see historic fights</Button>
      </Form>);
    }
    //Show loaded contestants
    let fighters = null;
    if (this.state.fighters.length > 0 && this.state.fightStarted === false && this.state.historic === false) {
      fighters = (<Fighters fighters= {this.state.fighters}
        startFight= {() => this.startFight()}
        restart = {() => this.restart()}/>);
    }
    if (this.state.fightStarted && this.state.historic === false) {
      fighters = (<Fight fighters= {this.state.fighters} restart = {() => this.restart()}/>);
    }
    if (this.state.fightStarted === false && this.state.historic) {
      fighters = (<Historic restart = {() => this.restart()}/>);
    }

    return (
      <div className="App">

        <Row className="App-header Font">
          <Col sm="3">
            <div className="col-sm-6 ">
              <div>
                <img src={banner} className="d-block img-fluid" alt="logo instafight" />
              </div>
            </div>
          </Col>
          <Col sm="6">
            <h1 className="App-title">Welcome to Instafight</h1>
            <p> by Juan Sebastián Barragán Jerónimo</p>
          </Col>
        </Row>
        <div className="Container Font">
          <Row >
            <Col sm="3"/>
            <Col sm="6">
              {fields}

            </Col>
          </Row>

          {fighters}
          <Row />
        </div>
        <Footer />
      </div>
    );
  }
}


export default App;
