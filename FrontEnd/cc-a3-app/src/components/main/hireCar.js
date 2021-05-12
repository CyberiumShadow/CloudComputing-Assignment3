import NavBar from 'components/utils/navBar';
import './main.css';

function HireCar() {
  return (
    <div>
      <NavBar currentPage={'HireCar'} />
      <div className="content-wrapper">
        <h3 className="page-title">Hire car</h3>
        <hr />
        This page allows user to hire a car from a list of available cars
      </div>
    </div>
  );
}

export default HireCar;