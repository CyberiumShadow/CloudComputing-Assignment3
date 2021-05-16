import NavBar from 'components/utils/navBar';
import styles from './main.module.css';

function Profile() {
  return (
    <div>
      <NavBar currentPage={'Profile'} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Profile</h3>
        <hr />
        This page allows user to view/edit personal information
      </div>
    </div>
  );
}

export default Profile;