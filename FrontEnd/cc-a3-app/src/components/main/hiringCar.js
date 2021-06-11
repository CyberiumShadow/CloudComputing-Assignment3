import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppContext } from "libs/context";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import LoadingButton from "components/utils/loadingButton";
import Car from "components/utils/car.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import setMilliseconds from "date-fns/setMilliseconds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDollarSign, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function HiringCar() {
  const { authentication } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const car = location.state.data;
  const date = new Date();
  const dateFormat = "dd MMMM yyyy, h:mm aa";
  const initialDate = setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), date.getHours() + 1);

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [price, setPrice] = useState("-");
  const [error, setError] = useState("Select dates to hire this car.");

  const handleStartDate = (selStartDate) => {
    setStartDate(selStartDate);
    setPrice(isDateValid(selStartDate, endDate)
      ? getHourDiff(selStartDate, endDate) * car.price
      : "-"
    );
  }

  const handleEndDate = (selEndDate) => {
    setEndDate(selEndDate);
    setPrice(isDateValid(startDate, selEndDate)
      ? getHourDiff(startDate, selEndDate) * car.price
      : "-"
    );
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDateValid()) return;

    setIsLoading(true);

    let data = {
      customer: authentication.username,
      start_time: startDate.getTime(),
      end_time: endDate.getTime(),
      cost: price
    }

    await fetch(`https://api.neocar.link/cars/${car.licence_plate}/bookings`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        console.log(response);
        window.alert("Booking successful! Your booking ID: " + response.booking_id);
      })
      .catch((err) => {
        console.log(err);
      });

    // history.push("/dashboard");
    setIsLoading(false);
  };

  const isDateValid = (startDt, endDt) => {
    let errorDate = "";
    let hourDiff = getHourDiff(startDt, endDt);
    if (startDt < initialDate) {
      errorDate = "Start date must be at least an hour after current hour.";
    }
    else if (+startDt > +endDt) {
      errorDate = "Start date must be earlier than end date.";
    }
    else if (hourDiff < car.minHour) {
      errorDate = "Minimum hour to hire this car is " + car.minHour + " hour(s).";
    }
    if (errorDate.length > 0) {
      errorDate += " Please select date again.";
    }
    setError(errorDate);
    return errorDate.length === 0;
  };

  const getHourDiff = (start, end) => (+end - +start) / (60 * 60 * 1000);

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
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
            <h6 className={`mb-3 ${styles.formTitle}`}>Car info</h6>
            <div className="table-responsive">
              <table className={`table table-sm table-hover w-auto ${styles.tableTopBorder}`}>
                <tbody>
                  <tr>
                    <td className={styles.tableTitle}>Car owner</td>
                    <td>{car.owner}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Make</td>
                    <td>{car.make}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Model</td>
                    <td>{car.model}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Model Year</td>
                    <td>{car.year}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Licence plate</td>
                    <td>{car.licence_plate}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Price per hour</td>
                    <td>${car.price}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Minimum hour</td>
                    <td>{car.minHour}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableTitle}>Pickup address</td>
                    <td>{car.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.hireCard}`}>  
            <h6 className={`card-header ${styles.hireCardHeader}`}>Hire details</h6>
              <div className="card-body">
                {error.length > 0 && (
                  <div className={styles.datePickerErrorWrapper}>
                    <span className={styles.datePickerError}>
                      <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
                    </span>
                  </div>
                )}
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>
                          <FontAwesomeIcon icon={faClock} size="sm" fixedWidth /> From
                        </td>
                        <td className={styles.tableBorderless}>
                          <DatePicker
                            className={styles.datePickerBody}
                            dateFormat={dateFormat}
                            selected={startDate}
                            onChange={handleStartDate}
                            selectsStart
                            showTimeSelect
                            minDate={initialDate}
                            startDate={startDate}
                            endDate={endDate}
                            timeIntervals={60}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>
                          <FontAwesomeIcon icon={faClock} size="sm" fixedWidth /> To
                        </td>
                        <td className={styles.tableBorderless}>
                          <DatePicker
                            className={styles.datePickerBody}
                            dateFormat={dateFormat}
                            selected={endDate}
                            onChange={handleEndDate}
                            selectsEnd
                            showTimeSelect
                            minDate={initialDate}
                            startDate={startDate}
                            endDate={endDate}
                            timeIntervals={60}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className={`${styles.tableTitle} ${styles.tableBorderless}`}>
                          <FontAwesomeIcon icon={faDollarSign} size="sm" fixedWidth />Total price
                        </td>
                        <td className={styles.tableBorderless}>
                          $ {price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className={`${styles.hireButton}`}>
                    <LoadingButton
                      isLoading={isLoading}
                      text={"Hire"}
                      loadingText={"Hiring"}
                      disabled={error.length > 0}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiringCar;