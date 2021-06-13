import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import { useAppContext } from "libs/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const { authentication } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    fetch(`https://api.neocar.link/users/${authentication.username}/currentBookings`, {
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

    fetch(`https://api.neocar.link/users/${authentication.username}/currentListings`, {
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
      <NavBar currentPage={"Dashboard"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Dashboard</h3>
        <hr />       

        <h6 className={styles.formTitle}>Your upcoming bookings</h6>
        {bookings.length === 0 && (
          <p className="mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No booking at the moment. Hire a car now.
          </p>
        )}
        {bookings.length > 0 && (
          <div className="row mb-2">
            {bookings.map(booking =>
              <div key={booking.booking_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
                <div className={`card ${styles.carCard}`}>
                  <img
                    className={`card-img-top rounded-top ${styles.carCardImage}`}
                    src={booking.image}
                    alt="Car"
                  ></img>
                  <div className={`card-body rounded ${styles.carCardBody}`}>
                    <p className={`card-title ${styles.carCardTitle}`}>
                      {booking.licence_plate}
                    </p>
                    <div>
                      {booking.start_time} - {booking.end_time}
                    </div>
                    <Link 
                      className="stretched-link" 
                      to={{
                        pathname: `/dashboard/booking/${booking.licence_plate}`,
                        state: {
                          data: booking
                        },
                      }}>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <h6 className={styles.formTitle}>Your current listed cars</h6>
        {listings.length === 0 && (
          <p className="mb-5">
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No car listed at the moment. List a car now.
          </p>
        )}
        {listings.length > 0 && (
          <div className="row">
            {listings.map(listing =>
              <div key={listing.licence_plate} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
                <div className={`card ${styles.carCard}`}>
                  <img
                    className={`card-img-top rounded-top ${styles.carCardImage}`}
                    src={listing.image}
                    alt="Car"
                  ></img>
                  <div className={`card-body rounded ${styles.carCardBody}`}>
                    <p className={`card-title ${styles.carCardTitle}`}>
                      {listing.make} {listing.model} {listing.year}
                    </p>
                    <p className="card-subtitle mb-2 text-muted">
                      {listing.licence_plate}
                    </p>
                    <div>
                      ${listing.price}/hr (min {listing.minHour}hr)
                    </div>
                    <div>
                      <small>{listing.address}</small>
                    </div>
                    <Link 
                      className="stretched-link" 
                      to={{
                        pathname: `/dashboard/listing/${listing.licence_plate}`,
                        state: {
                          data: listing
                        },
                      }}>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;