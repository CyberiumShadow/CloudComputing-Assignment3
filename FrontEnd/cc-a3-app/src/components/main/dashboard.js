import React, { useState, useEffect } from "react";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";

function Dashboard() {
  const [error, setError] = useState("");
  const [items, setItems] = useState({
    upcomingHired: [],
    currentListed: [],
  });

  // useEffect(() => {
  //   fetch("https://api.neocar.link/")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setItems({
  //           upcomingHired: result.items
  //         });
  //       },
  //       (error) => {
  //         setError(error);
  //       }
  //     )

  //   fetch("https://api.neocar.link/")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setItems({
  //           currentListed: result.items
  //         });
  //       },
  //       (error) => {
  //         setError(error);
  //       }
  //     )
  // });

  return (
    <div>
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Dashboard</h3>
        <hr />        

        <h6 className={styles.formTitle}>Upcoming hired car</h6>
        <div className="row mb-3">
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
                <div>07 Aug, 09:00am - 10 Aug, 09:00am</div>
                <div>
                  <small>124 La Trobe St, Melbourne VIC 3000</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h6 className={styles.formTitle}>Current listed car</h6>
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
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;