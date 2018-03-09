import React, { Component } from "react";
import banner from "./banner.png";
import { Button, Label, Input, Form, FormGroup, Row, FormFeedback, Col } from "reactstrap";
import "./App.css";
import Fighter from "./fighter";

class App extends Component {
  constructor (props) {
    super(props);
    this.findfighter = this.findfighter.bind(this);
    this.addField = this.addField.bind(this);
    this.setFighter = this.setFighter.bind(this);
    this.state = {
      fighters: [],
      fields: [{ id: 0, field: "", invalid: false }, { id: 1, field: "", invalid: false }]
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
          let fightersTemp = this.state.fighters;
          fightersTemp.push(fighter);
          this.setState({ fighters: fightersTemp });
        })
        .catch((err) => this.reportError(f.id));
    });
  }
  //add field for more accounts
  addField () {
    let index = this.state.fields.length + 1;
    this.setState({
      fields: this.state.fields.concat([{ id: Number(index), field: "", invalid: false }])
    });
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
    //Fields to users accounts
    let fields = (<Form >{this.state.fields.map((p) => {
      return (<FormGroup key ={p.id}>
        <Label className="Font">Fighter {" " + (p.id + 1)}</Label>
        <Input name={"fighter" + p.id} id={p.id} placeholder="jusebarjer"
          value={p.field} onChange={this.setFighter} invalid={p.invalid}/>
        <FormFeedback invalid>Sorry, this Instagram account do not exist</FormFeedback>
      </FormGroup>);
    })}</Form>);
    //Show loaded contestants
    let fighters = null;
    if (this.state.fighters.length > 0) {
      fighters = (<Row className="Spacing"> {this.state.fighters.map((f) => {
        return (<Fighter key ={f.user.id} fighter = {f}/>);
      })} </Row>);
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
              <h1>Load the contestants</h1>
              {fields}
              <Button onClick={this.addField}>Add more accounts</Button>
              <Button onClick={this.findfighter}>Load the contestants </Button>
            </Col>
          </Row>

          {fighters}
          <Row />
        </div>
      </div>
    );
  }
}


export default App;
