import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import NavBar from "components/utils/navBar"
import './main.css'

class Stats extends Component {
  render() {
    return (
      <div>
        <NavBar currentPage={'Stats'} />
        <div className="content-wrapper">
          <h3 className="page-title">Stats</h3>
          <hr />
          This page shows user's past car hire records and stats
        </div>
      </div>
    );
  }
}

export default Stats;