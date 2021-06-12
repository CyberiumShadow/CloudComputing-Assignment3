import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppContext } from "libs/context";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import LoadingButton from "components/utils/loadingButton";
import LoadingButtonOutline from "components/utils/loadingButtonOutline";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { ConsoleLogger } from "@aws-amplify/core";

function Listing() {
  const { authentication } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const car = location.state.data;

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [address, setAddress] = useState({
    label: `${car.address}`,
  });
  const [form, setForm] = useState({
    price: `${car.price}`,
    minHour: `${car.minHour}`,
  });

  const [error, setError] = useState({
    price: "",
    minHour: "",
    address: "",
  });

  useEffect(() => {
    // validate form
    const numbers = /^[0-9]+$/;
    setError({
      price:
        form.price.length > 0 && !form.price.match(numbers)
          ? "List price must be numeric"
          : "",
      minHour:
        form.minHour.length > 0 && !form.minHour.match(numbers)
          ? "Minimum hour must be numeric"
          : "",
      address: "",
    });
  }, [form]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!isSubmissionValid()) return;

    setIsEditLoading(true);

    let data = {
      price: form.price,
      minHour: form.minHour,
      address: address.label
    }
    
    await fetch(`https://api.neocar.link/cars/${car.licence_plate}`, {
      method: "PATCH",
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
        window.alert("Listing is edited!");
        history.push("/dashboard");
      })
      .catch((err) => {
        window.alert("Listing cannot be edited! Please try again.");
        console.log(err);
      });
    
    setIsEditLoading(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setIsCancelLoading(true);
    
    await fetch(`https://api.neocar.link/cars/${car.licence_plate}`, {
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
        window.alert("Listing is cancelled!");
        history.push("/dashboard");
      })
      .catch((err) => {
        window.alert("Listing cannot be cancelled! Please try again.");
        console.log(err);
      });
    
    setIsCancelLoading(false);
  };

  const isSubmissionValid = () => {
    var errorPrice =
      parseInt(form.price) === 0 
        ? "List price must be more than zero" 
        : "";
    var errorMinHour =
      parseInt(form.minHour) < 1 || parseInt(form.minHour) > 48
        ? "Minimum hour must be between 1 and 48"
        : "";
    var errorAddress = 
      address === null
        ? "Pickup address is required"
        : "";

    setError({
      price: errorPrice,
      minHour: errorMinHour,
      address: errorAddress,
    });

    return (
      errorPrice.length === 0 &&
      errorMinHour.length === 0 &&
      errorAddress.length === 0
    );
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

        <div className="form-group mb-4">
          <h5 className={styles.formTitle}>
            Edit your current car listing
          </h5>
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>Make</label>
          <input
            type="text"
            className={styles.inputBody}
            name="make"
            value={car.make}
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>Model</label>
          <input
            type="text"
            className={styles.inputBody}
            name="model"
            value={car.model}
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>Model year</label>
          <input
            type="text"
            className={styles.inputBody}
            name="year"
            value={car.year}
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>Licence plate</label>
          <input
            type="text"
            className={styles.inputBody}
            name="plate"
            value={car.licence_plate}
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>List price per hour</label>
          <input
            type="text"
            className={styles.inputBody}
            spellCheck={false}
            required={true}
            name="price"
            placeholder="e.g. 20"
            value={form.price}
            onChange={handleChange}
          />
          {error.price.length > 0 && (
            <span className={styles.inputError}>{error.price}</span>
          )}
        </div>
        <div className="form-group mb-3">
          <label className={styles.inputTitle}>Minimum hour</label>
          <input
            type="text"
            className={styles.inputBody}
            spellCheck={false}
            required={true}
            placeholder="1 - 48"
            name="minHour"
            value={form.minHour}
            onChange={handleChange}
          />
          {error.minHour.length > 0 && (
            <span className={styles.inputError}>{error.minHour}</span>
          )}
        </div>
        <div className={`form-group mb-4 ${styles.flexContainer}`}>
          <label className={styles.inputTitle}>Pickup address</label>
          <div className={`${styles.inputBodyLong}`}>
            <GooglePlacesAutocomplete
              selectProps={{
                address,
                onChange: setAddress,
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ['au'],
                }
              }}
            />
          </div>
          {error.address.length > 0 && (
            <span className={styles.inputError}>{error.address}</span>
          )}
        </div>
          
        <form onSubmit={handleEdit}>
          <div className={`form-group ${styles.inputSubmit}`}>
            <LoadingButton
              isLoading={isEditLoading}
              text={"Edit listing"}
              loadingText={"Editing"}
              disabled={
                error.price.length > 0 ||
                error.minHour.length > 0 || 
                error.address.length > 0
              }
            />
          </div>
        </form>

        <form onSubmit={handleCancel} className="mt-3">
          <div>
            <LoadingButtonOutline
              isLoading={isCancelLoading}
              text={"Cancel listing"}
              loadingtText={"Cancelling"}
            />
          </div>
        </form>

      </div>
    </div>
  );
}

export default Listing;
