import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppContext } from "libs/context";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";
import LoadingButton from "components/utils/loadingButton";
import LoadingButtonOutline from "components/utils/loadingButtonOutline";

function Booking() {
  const { authentication } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const booking = location.state.data;

  const [isCompleteLoading, setIsCompleteLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const handleComplete = async (e) => {
    e.preventDefault();

    setIsCompleteLoading(true);    

    await fetch(`https://api.neocar.link/cars/${booking.licence_plate}/bookings/${booking.booking_id}/complete`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        console.log(response);
        window.alert("Booking is completed!");
        history.push("/dashboard");
      })
      .catch((err) => {
        window.alert("Booking cannot be completed! Please try again.");
        console.log(err);
      });

    setIsCompleteLoading(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    setIsCancelLoading(true);    

    await fetch(`https://api.neocar.link/cars/${booking.licence_plate}/bookings/${booking.booking_id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${authentication.accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        console.log(response);
        window.alert("Booking is cancelled!");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Booking cannot be cancelled! Please try again.");
      });

    setIsCancelLoading(false);
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
                    <td className={styles.tableTitle}>Booking ID</td>
                    <td>{booking.booking_id}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Licence plate</td>
                    <td>{booking.licence_plate}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>From</td>
                    <td>todo</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>To</td>
                    <td>todo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <form onSubmit={handleComplete}>
          <div>
            <LoadingButton
              isLoading={isCompleteLoading}
              text={"Complete booking"}
              loadingText={"Completing"}
            />
          </div>
        </form>

        <form onSubmit={handleCancel} className="mt-3">
          <div>
            <LoadingButtonOutline
              isLoading={isCancelLoading}
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