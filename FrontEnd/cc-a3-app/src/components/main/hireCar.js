import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "libs/context";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import Car from "components/utils/car.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function HireCar() {
  const { authentication } = useAppContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.neocar.link/cars", {
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
        setData(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavBar currentPage={"HireCar"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Hire car</h3>
        <hr />
        
        {!data.message && (
          <div className="row">
            {data.map(car =>
              <div key={car.licence_plate} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
                <div className={`card ${styles.carCard}`}>
                  <img
                    className={`card-img-top rounded-top ${styles.carCardImage}`}
                    src={Car}
                    alt="Car"
                  ></img>
                  <div className={`card-body rounded ${styles.carCardBody}`}>
                    <p className={`card-title ${styles.carCardTitle}`}>
                      {car.make} {car.model} {car.year}
                    </p>
                    <p className="card-subtitle mb-2 text-muted">{car.owner}</p>
                    <div>${car.price}/hr (min {car.minHour}hr)</div>
                    <div>
                      <small>{car.address}</small>
                    </div>
                    <Link 
                      className="stretched-link" 
                      to={{
                        pathname: `/hire-car/${car.licence_plate}`,
                        state: {
                          data: car
                        },
                      }}>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {data.message && (
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
            No car listed at the moment. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}

export default HireCar;
