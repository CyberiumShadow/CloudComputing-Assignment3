import React, { useState, useEffect } from "react";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import { useAppContext } from "libs/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import convertToDateStr from "components/utils/convertToDateStr";

function Stats() {
  const { authentication } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    fetch(`https://api.neocar.link/users/${authentication.username}/bookingHistory`, {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://api.neocar.link/users/${authentication.username}/listingHistory`, {
      method: "get",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setListings(data);
      })
      .catch((err) => {
        console.log(err);
      });

      return () => {
        setBookings([]);
        setListings([]);
      }
  }, []);

  return (
    <div>
      <NavBar currentPage={"Stats"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Stats</h3>
        <hr />
        <h5 className={styles.formTitle}>Car hired</h5>
        <p className={styles.subTitle}>Table shows all cars hired by you in the past</p>
        {bookings.length > 0 && (
          <div className={`table-responsive ${styles.tableScrollable}`}>
            <table className={`table table-sm table-hover ${styles.tableCustom}`}>
              <thead>
                <tr>
                  <th className={styles.th1}>Owner</th>
                  <th className={styles.th2}>Car</th>
                  <th className={styles.th3}>Licence Plate</th>
                  <th className={styles.th4}>Cost</th>
                  <th className={styles.th5}>From</th>
                  <th className={styles.th6}>To</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking =>
                  <tr key={booking.booking_id}>
                    <td>{booking.owner}</td>
                    <td>{booking.car}</td>
                    <td>{booking.licence_plate}</td>
                    <td>${booking.cost}</td>
                    <td>{convertToDateStr(booking.start_time)}</td>
                    <td>{convertToDateStr(booking.end_time)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {bookings.length === 0 && (
          <p className="mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No cars hired in the past. Hire one now.
          </p>
        )}
        <br />
        <br />

        <h5 className={styles.formTitle}>Car listed</h5>
        <p className={styles.subTitle}>Table shows all cars listed by you and hired by customers in the past</p>
        {listings.length > 0 && (
          <div className={`table-responsive ${styles.tableScrollable}`}>
            <table className={`table table-sm table-hover ${styles.tableCustom}`}>
              <thead>
                <tr>
                  <th className={styles.th1}>Customer</th>
                  <th className={styles.th2}>Car</th>
                  <th className={styles.th3}>Licence Plate</th>
                  <th className={styles.th4}>Cost</th>
                  <th className={styles.th5}>From</th>
                  <th className={styles.th6}>To</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) =>
                  <tr key={index}>
                    <td>{listing.customer}</td>
                    <td>{listing.car}</td>
                    <td>{listing.licence_plate}</td>
                    <td>${listing.cost}</td>
                    <td>{convertToDateStr(listing.start_time)}</td>
                    <td>{convertToDateStr(listing.end_time)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
          {listings.length === 0 && (
            <p className="mb-5">
              <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
              No listed cars hired by customers in the past.
            </p>
          )}
      </div>
    </div>
  );
}

export default Stats;