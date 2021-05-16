import NavBar from 'components/utils/navBar';
import styles from './main.module.css';

function HireCar() {
  return (
    <div>
      <NavBar currentPage={'HireCar'} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Hire car</h3>
        <hr />
        This page allows user to hire a car from a list of available cars
      </div>
    </div>
  );
}

export default HireCar;