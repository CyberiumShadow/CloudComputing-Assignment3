import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faCar, faHome, faPowerOff, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "libs/context";
import config from 'config';
import './utils.css';

function NavBar(props) {
  const { userHasAuthenticated } = useAppContext();
  const username = localStorage.getItem('CognitoIdentityServiceProvider.' + config.cognito.APP_CLIENT_ID + '.LastAuthUser');

  const logout = async e => {
    try {
      await Auth.signOut();
      userHasAuthenticated(false);
      props.history.push('/');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div>
      <ul className="nav-sidebar">
        <h2 className="nav-sidebar-brand">NeoCar</h2>
        <div className="nav-sidebar-username">
          <small>{username}</small>
        </div>
        <li>
          <Link className={`nav-sidebar-list ${props.currentPage === 'Dashboard' ? 'nav-sidebar-current' : ''}`} to={"/dashboard"}>
            <FontAwesomeIcon icon={faHome} fixedWidth /> Dashboard
          </Link>
        </li>
        <li>
          <Link className={`nav-sidebar-list ${props.currentPage === 'Profile' ? 'nav-sidebar-current' : ''}`} to={"/profile"}>
            <FontAwesomeIcon icon={faUser} fixedWidth /> Profile
          </Link>
        </li>
        <li>
          <Link className={`nav-sidebar-list ${props.currentPage === 'HireCar' ? 'nav-sidebar-current' : ''}`} to={"/hire-car"}>
            <FontAwesomeIcon icon={faCar} fixedWidth /> Hire car
          </Link>
        </li>
        <li>
          <Link className={`nav-sidebar-list ${props.currentPage === 'ListCar' ? 'nav-sidebar-current' : ''}`} to={"/list-car"}>
            <FontAwesomeIcon icon={faEdit} fixedWidth /> List car
          </Link>
        </li>
        <li>
          <Link className={`nav-sidebar-list ${props.currentPage === 'Stats' ? 'nav-sidebar-current' : ''}`} to={"/stats"}>
            <FontAwesomeIcon icon={faChartLine} fixedWidth /> Stats
          </Link>
        </li>
        <hr className="nav-sidebar-divider" />
        <li className="nav-sidebar-list" onClick={logout}>
          <FontAwesomeIcon icon={faPowerOff} fixedWidth /> Logout
        </li>
        <span className="nav-sidebar-footer">&copy; 2021 NeoCar</span>
      </ul>
    </div>
  );
}

export default withRouter(NavBar);