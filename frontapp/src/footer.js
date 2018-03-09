/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./App.css";

class Footer extends Component {
  render () {
    return (

      <footer className="footer">
        <p className="centercontainer">
          © Juan Sebastián Barragán Jerónimo <br />
          Designed with
          <a href="https://reactstrap.github.io" target="parent">Reactstrap</a>
          <br />
          Would you like to see
          <a href="https://github.com/jsbarragan796/jsbarragan796" target="parent"> my personal page?</a>
        </p>

      </footer>
    );
  }
}

export default Footer;
