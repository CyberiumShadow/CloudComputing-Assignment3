import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import NavBar from "components/utils/navBar"
import './main.css'

class Profile extends Component {
  render() {
    return (
      <div>
        <NavBar currentPage={'Profile'} />
        <div className="content-wrapper">
          <h3 className="page-title">Profile</h3>
          <hr />
          This page allows user to edit his/her personal and car information
        </div>
      </div>
    );
  }
}

export default Profile;