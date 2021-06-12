import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";
import { useAppContext } from "libs/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const { authentication } = useAppContext();
  const [bookings, setBookings] = useState(null);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    fetch(`https://api.neocar.link/users/${authentication.username}/currentBooking`, {
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
        console.log("booking");
        console.log(data);
        setBookings(data)
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://api.neocar.link/users/${authentication.username}/currentListing`, {
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
        console.log("listing");
        console.log(data);
        setListings(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Dashboard</h3>
        <hr />        

        <h6 className={styles.formTitle}>Your upcoming booking</h6>
        {bookings === null && (
          <p className="mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No booking at the moment. Hire a car now.
          </p>
        )}
        {bookings !== null && (
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
                    {bookings.licence_plate}
                  </p>
                  <div>
                    from - to
                  </div>
                  <Link 
                    className="stretched-link" 
                    to={{
                      pathname: `/dashboard/booking/${bookings.licence_plate}`,
                      state: {
                        data: bookings
                      },
                    }}>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <h6 className={styles.formTitle}>Your current listed car</h6>
        {listings === null && (
          <p className="mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No car listed at the moment. List a car now.
          </p>
        )}
        {listings !== null && (
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
                    {listings.make} {listings.model} {listings.year}
                  </p>
                  <p className="card-subtitle mb-2 text-muted">
                    {listings.licence_plate}
                  </p>
                  <div>
                    ${listings.price}/hr (min {listings.minHour}hrs)
                  </div>
                  <div>
                    <small>{listings.address}</small>
                  </div>
                  <Link 
                    className="stretched-link" 
                    to={{
                      pathname: `/dashboard/listing/${listings.licence_plate}`,
                      state: {
                        data: listings
                      },
                    }}>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;