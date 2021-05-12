import NavBar from 'components/utils/navBar';
import './main.css';

function Profile() {
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

export default Profile;