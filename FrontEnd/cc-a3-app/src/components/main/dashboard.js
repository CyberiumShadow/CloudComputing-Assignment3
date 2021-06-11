import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";

function Dashboard() {
  // todo: fetch upcoming hired cars & current listed car of current login user

  return (
    <div>
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Dashboard</h3>
        <hr />        

        <h6 className={styles.formTitle}>Your upcoming booking</h6>
        <div className="row mb-2">
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
                <p className="card-subtitle mb-2 text-muted">
                  g4ge
                </p>
                <div>
                  07 Aug, 09:00am - 10 Aug, 09:00am
                </div>
                <div>
                  <small>124 La Trobe St, Melbourne VIC 3000</small>
                </div>
                <Link 
                  className="stretched-link" 
                  to={{
                    pathname: `/dashboard/booking/ABC126`,
                  }}>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <h6 className={styles.formTitle}>Your current listed car</h6>
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
              <p className="card-subtitle mb-2 text-muted">
                CCC111
              </p>
              <div>
                $10/hr (min 24hrs)
              </div>
              <div>
                <small>124 La Trobe St, Melbourne VIC 3000</small>
              </div>
              <Link 
                className="stretched-link" 
                to={{
                  pathname: `/dashboard/listing/CCC111`,
                }}>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;