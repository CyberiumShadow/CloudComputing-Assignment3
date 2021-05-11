import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './utils.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEdit, faCar, faHome, faPowerOff, faChartLine } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {
  render() {
    return (
      <div>
        <ul className="nav-sidebar">
          <h2 className="nav-sidebar-brand">NeoCar</h2>
          <li>
            <Link className={`nav-sidebar-list ${this.props.currentPage === 'Dashboard' ? 'nav-sidebar-current' : ''}`} to={"/dashboard"}>
              <FontAwesomeIcon icon={faHome} size="s" fixedWidth /> Dashboard
            </Link>
          </li>
          <li>
            <Link className={`nav-sidebar-list ${this.props.currentPage === 'Profile' ? 'nav-sidebar-current' : ''}`} to={"/profile"}>
              <FontAwesomeIcon icon={faUser} size="s" fixedWidth /> Profile
            </Link>
          </li>
          <li>
          <Link className={`nav-sidebar-list ${this.props.currentPage === 'HireCar' ? 'nav-sidebar-current' : ''}`} to={"/hire-car"}>
             <FontAwesomeIcon icon={faCar} size="s" fixedWidth /> Hire car
            </Link>
          </li>
          <li>
          <Link className={`nav-sidebar-list ${this.props.currentPage === 'ListCar' ? 'nav-sidebar-current' : ''}`} to={"/list-car"}>
              <FontAwesomeIcon icon={faEdit} size="s" fixedWidth /> List car
            </Link>
          </li>
          <li>
          <Link className={`nav-sidebar-list ${this.props.currentPage === 'Stats' ? 'nav-sidebar-current' : ''}`} to={"/stats"}>
              <FontAwesomeIcon icon={faChartLine} size="s" fixedWidth /> Stats
            </Link>
          </li>
          <hr className="nav-sidebar-divider" />
          <li>
            <Link className="nav-sidebar-list" to={"/login"}>
              <FontAwesomeIcon icon={faPowerOff} size="s" fixedWidth /> Logout
            </Link>
          </li>
          <span className="nav-sidebar-footer">&copy; 2021 NeoCar</span>
        </ul>
      </div>
    );
  }
}

export default NavBar;