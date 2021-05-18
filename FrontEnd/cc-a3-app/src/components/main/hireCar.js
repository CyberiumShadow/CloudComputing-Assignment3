import { Link } from 'react-router-dom';
import NavBar from 'components/utils/navBar';
import styles from './main.module.css';
import CarRent from 'components/utils/car-rent.jpg';

// This page allows user to hire a car from a list of available cars
function HireCar() {
  return (
    <div>
      <NavBar currentPage={'HireCar'} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Hire car</h3>
        <hr />
        <div className="row">
        
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="card">
            <img className="card-img-top" src={CarRent} alt="Car"></img>
              <div className="card-body">
                <h5 className="card-title">Toyota Corolla 2019</h5>
                <h6 className="card-subtitle mb-2 text-muted">g4ge</h6>
                <div>$20/hr (min 24hrs)</div>
                <div><small>124 La Trobe St, Melbourne VIC 3000</small></div>
                <Link className="stretched-link" to={"/dashboard"}></Link>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default HireCar;