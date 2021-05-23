import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Car from "components/utils/car.jpg";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import LoadingButton from "components/utils/loadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function HireCar() {
  const date = new Date();
  const initialDate = setHours(setMinutes(setSeconds(date, 0), 0), date.getHours() + 1)
  const maxTime = setHours(setMinutes(date, 59), 23);
  const dateFormat = "dd MMMM yyyy, h:mm aa";

  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(initialDate);
  const [endDate, setEndDate] = useState(initialDate);
  const [error, setError] = useState("");
  
  let currentStartHour = initialDate.getHours();
  let currentEndHour = initialDate.getHours();
  let currentStartMins = initialDate.getMinutes();
  let currentEndMins = initialDate.getMinutes();

  const isSelectedStartDateInFuture = +startDate > +initialDate;
  const isSelectedEndDateInFuture = +endDate > +initialDate;
  if (isSelectedStartDateInFuture) {
    currentStartHour = currentStartMins = 0;
  }
  if (isSelectedEndDateInFuture) {
    currentEndHour = currentEndMins = 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDateValid()) return;

    setIsLoading(true);
    console.log(startDate, endDate);
    setIsLoading(false);
  };

  const isDateValid = () => {
    let errorDate = (+startDate >= +endDate)
      ? "Start date must be earlier than end date. Please select again."
      : "";
    
    setError(errorDate);
    return errorDate.length === 0;
  };

  return (
    <div>
      <NavBar currentPage={"HireCar"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>Hire car</h3>
        <hr />
        <div className="row">
          <div className="col-12 mb-5">
            <div className={`card ${styles.hireCard}`}> 
              <h6 className={`card-header ${styles.hireCardHeader}`}>
                <FontAwesomeIcon icon={faClock} fixedWidth /> Pick your time
              </h6>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {error.length > 0 && (
                    <div className={styles.datePickerErrorWrapper}>
                      <span className={styles.datePickerError}>{error}</span>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-1 mb-1">
                      <label className={styles.datePickerTitle}>From</label>
                      <DatePicker
                        className={styles.datePickerBody}
                        dateFormat={dateFormat}
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        showTimeSelect
                        minDate={initialDate}
                        maxDate={endDate}
                        minTime={setHours(setMinutes(initialDate, currentStartMins), currentStartHour)}
                        maxTime={maxTime}
                        startDate={startDate}
                        endDate={endDate}
                        timeIntervals={60}
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-1 mb-1">
                      <label className={styles.datePickerTitle}>To</label>
                      <DatePicker
                        className={styles.datePickerBody}
                        dateFormat={dateFormat}
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        showTimeSelect
                        minDate={startDate}
                        minTime={setHours(setMinutes(initialDate, currentEndMins), currentEndHour)}
                        maxTime={maxTime}
                        startDate={startDate}
                        endDate={endDate}
                        timeIntervals={60}
                      />
                    </div>
                    <div className={`col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ${styles.selectTimeButton} mt-1 mb-1`}>
                      <LoadingButton
                        isLoading={isLoading}
                        text={"Select time"}
                        disabled={false}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.carCard}`}>
            <img className={`card-img-top rounded-top ${styles.carCardImage}`} src={Car} alt="Car"></img>
              <div className={`card-body rounded ${styles.carCardBody}`}>
                <p className={`card-title ${styles.carCardTitle}`}>Toyota Corolla 2019</p>
                <p className="card-subtitle mb-2 text-muted">g4ge</p>
                <div>$10/hr (min 24hrs)</div>
                <div><small>124 La Trobe St, Melbourne VIC 3000</small></div>
                <Link className="stretched-link" to={"/hire-car/ABC123"}></Link>
              </div>
            </div>
          </div>
         
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
            <div className={`card ${styles.carCard}`}>
            <img className={`card-img-top rounded-top ${styles.carCardImage}`} src={Car} alt="Car"></img>
              <div className={`card-body rounded ${styles.carCardBody}`}>
                <p className={`card-title ${styles.carCardTitle}`}>Toyota Corolla 2019</p>
                <p className="card-subtitle mb-2 text-muted">g4ge</p>
                <div>$10/hr (min 24hrs)</div>
                <div><small>124 La Trobe St, Melbourne VIC 3000</small></div>
                <Link className="stretched-link" to={"/hire-car/ABC123"}></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HireCar;