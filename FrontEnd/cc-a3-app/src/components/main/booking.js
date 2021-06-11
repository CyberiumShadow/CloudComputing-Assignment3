import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppContext } from "libs/context";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";
import LoadingButton from "components/utils/loadingButton";

function Booking() {
  const { authentication } = useAppContext();
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);    

    // await fetch(`https://api.neocar.link/`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${authentication.accessToken}`,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw response;
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     window.alert("Booking cancelled successfully!");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // history.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div>
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <Link className="link" to={"/dashboard"}>
          {"<"} back
        </Link> 
        <br />
        <br />

        <h5 className={`mb-4 ${styles.formTitle}`}>Upcoming booking</h5>
        
        <div className="row mb-3">
          <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12 mb-3">
            <div className={styles.hireCarImageFrame}>
              <img className={styles.hireCarImage} src={Car} alt="Car"></img>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
            <h6 className={`mb-3 ${styles.formTitle}`}>Booking info</h6>
            <div className="table-responsive">
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
                    <td>ABC126</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>From</td>
                    <td>07 Aug, 09:00am</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>To</td>
                    <td>10 Aug, 09:00am</td>
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

        <form onSubmit={handleSubmit}>
          <div>
            <LoadingButton
              isLoading={isLoading}
              text={"Cancel booking"}
              loadingText={"Cancelling"}
            />
          </div>
        </form>

        <br />
      </div>
    </div>
  );
}

export default Booking;