import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import NavBar from "components/utils/navBar"
import './main.css'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar currentPage={'Dashboard'} />
        <div className="content-wrapper">
          <h3 className="page-title">Dashboard</h3>
          <hr />
          This page shows upcoming car rental and current car hire listing
        </div>
      </div>
    );
  }
}

export default Dashboard;