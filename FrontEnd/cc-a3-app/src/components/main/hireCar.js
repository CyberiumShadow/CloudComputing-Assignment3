import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import NavBar from "components/utils/navBar"
import './main.css'

class HireCar extends Component {
  render() {
    return (
      <div>
        <NavBar currentPage={'HireCar'} />
        <div className="content-wrapper">
          <h3 className="page-title">Hire car</h3>
          <hr />
          This page allows user to hire a car from a list of available cars
        </div>
      </div>
    );
  }
}

export default HireCar;