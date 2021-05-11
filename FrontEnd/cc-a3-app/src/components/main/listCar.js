import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import NavBar from "components/utils/navBar"
import './main.css'

class ListCar extends Component {
  render() {
    return (
      <div>
        <NavBar currentPage={'ListCar'} />
        <div className="content-wrapper">
          <h3 className="page-title">List car</h3>
          <hr />
          This page allows user to list his/her car
        </div>
      </div>
    );
  }
}

export default ListCar;