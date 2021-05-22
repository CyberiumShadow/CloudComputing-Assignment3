import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import LoadingButton from "components/utils/loadingButton";
import Car from "components/utils/car.jpg";

function HiringCar() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <NavBar currentPage={"HireCar"} />
      <div className={styles.contentWrapper}>
        <Link className="link" to={"/hire-car"}>
          {"<"} back
        </Link> 
        <br />
        <br />

        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12 mb-3">
            <div className={styles.hireCarImageFrame}>
              <img className={styles.hireCarImage} src={Car} alt="Car"></img>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 mb-3">
            <h6 className={`mb-3 ${styles.formTitle}`}>Car info</h6>
            <div class="table-responsive">
              <table className={`table table-sm table-hover w-auto ${styles.tableTopBorder}`}>
                <tbody>
                  <tr>
                    <td className={styles.tableTitle}>Car owner</td>
                    <td>g4ge</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Make</td>
                    <td>Toyota</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Model</td>
                    <td>Corolla</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Model Year</td>
                    <td>2019</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Licence plate</td>
                    <td>ABC123</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Price per hour</td>
                    <td>$10</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Minimum hour</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Pickup address</td>
                    <td>124 La Trobe St, Melbourne VIC 3000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.hireCard}`}>  
            <h6 className={`card-header ${styles.hireCardHeader}`}>Hire details</h6>
              <div className="card-body">
                <div class="table-responsive mb-1">
                  <table className="table table-sm table-hover">
                    <tbody>
                      <tr>
                        <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>From</td>
                        <td className={styles.tableBorderless}>9.00am, 23 May</td>
                      </tr>
                      <tr>
                      <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>To</td>
                        <td className={styles.tableBorderless}>9.00am, 25 May</td>
                      </tr>
                      <tr>
                      <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>Total price</td>
                        <td className={styles.tableBorderless}>$480</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={`${styles.hireButton}`}>
                  <LoadingButton
                    isLoading={isLoading}
                    text={"Pay & Hire"}
                    disabled={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiringCar;