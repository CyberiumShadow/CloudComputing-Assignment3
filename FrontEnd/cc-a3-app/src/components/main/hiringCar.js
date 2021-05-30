import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const date = new Date();
  const dateFormat = "dd MMMM yyyy, h:mm aa";
  const initialDate = setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), date.getHours() + 1);

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [price, setPrice] = useState("-");
  const [error, setError] = useState("Select date(s) to hire this car.");
  
  // to be replaced by real value
  let minHour = 12; 
  let pricePerHour = 10;

  const handleStartDate = (selStartDate) => {
    setStartDate(selStartDate);
    setPrice(isDateValid(selStartDate, endDate)
      ? getHourDiff(selStartDate, endDate) * pricePerHour
      : "-"
    );
  }

  const handleEndDate = (selEndDate) => {
    setEndDate(selEndDate);
    setPrice(isDateValid(startDate, selEndDate)
      ? getHourDiff(startDate, selEndDate) * pricePerHour
      : "-"
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDateValid()) return;

    setIsLoading(true);
    history.push("/dashboard");
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
    else if (hourDiff < minHour) {
      errorDate = "Minimum hour to hire this car is " + minHour + " hour(s).";
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