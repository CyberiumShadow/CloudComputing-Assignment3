import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";

function HireCar() {
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("https://api.neocar.link/cars")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setItems(result.items);
  //       },
  //       (error) => {
  //         setError(error);
  //       }
  //     )
  // });

  return (
    <div>
      <NavBar currentPage={"HireCar"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Hire car</h3>
        <hr />
        
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.carCard}`}>
              <img
                className={`card-img-top rounded-top ${styles.carCardImage}`}
                src={Car}
                alt="Car"
              ></img>
              <div className={`card-body rounded ${styles.carCardBody}`}>
                <p className={`card-title ${styles.carCardTitle}`}>
                  Toyota Corolla 2019
                </p>
                <p className="card-subtitle mb-2 text-muted">g4ge</p>
                <div>$10/hr (min 24hrs)</div>
                <div>
                  <small>124 La Trobe St, Melbourne VIC 3000</small>
                </div>
                <Link className="stretched-link" to={"/hire-car/ABC123"}></Link>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.carCard}`}>
              <img
                className={`card-img-top rounded-top ${styles.carCardImage}`}
                src={Car}
                alt="Car"
              ></img>
              <div className={`card-body rounded ${styles.carCardBody}`}>
                <p className={`card-title ${styles.carCardTitle}`}>
                  Toyota Corolla 2019
                </p>
                <p className="card-subtitle mb-2 text-muted">g4ge</p>
                <div>$10/hr (min 24hrs)</div>
                <div>
                  <small>124 La Trobe St, Melbourne VIC 3000</small>
                </div>
                <Link className="stretched-link" to={"/hire-car/ABC123"}></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HireCar;
