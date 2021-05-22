import React, { useState, useEffect } from "react";
import NavBar from "components/utils/navBar";
import styles from "./main.module.css";
import LoadingButton from "components/utils/loadingButton";
import { useAppContext } from "libs/context";

function ListCar() {
  const { authentication } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
    price: "",
    minHour: "",
    address: "",
  });

  const [error, setError] = useState({
    year: "",
    plate: "",
    price: "",
    minHour: "",
  });

  useEffect(() => {
    // validate form
    const numbers = /^[0-9]+$/;
    const plate = /^[A-Z0-9]+$/;
    setError({
      year:
        form.year.length > 0 && !form.year.match(numbers)
          ? "Model year must be numeric"
          : "",
      plate:
        form.plate.length > 0 && !form.plate.match(plate)
          ? "License plate must contain only letters/numbers"
          : "",
      price:
        form.price.length > 0 && !form.price.match(numbers)
          ? "List price must be numeric"
          : "",
      minHour:
        form.minHour.length > 0 && !form.minHour.match(numbers)
          ? "Minimum hour must be numeric"
          : "",
    });
  }, [form]);

  const handleChange = (e) => {
    if (e.target.name === "plate")
      e.target.value = e.target.value.toUpperCase();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmissionValid()) return;

    setIsLoading(true);

    var formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("image", image);

    fetch("http://localhost:3001/cars", {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authentication.accessToken}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });

    console.log(...formData);
    setIsLoading(false);
  };

  const isSubmissionValid = () => {
    var errorYear =
      parseInt(form.year) < 2000 || parseInt(form.year) > 2021
        ? "Model year must be between 2000 and 2021"
        : "";
    var errorPlate =
      form.plate.length < 2 || form.plate.length > 6
        ? "Licence plate must be between 2 to 6 letters/numbers"
        : "";
    var errorPrice =
      parseInt(form.price) === 0 ? "List price must be more than zero" : "";
    var errorMinHour =
      parseInt(form.minHour) < 1 || parseInt(form.minHour) > 48
        ? "Minimum hour must be between 1 and 48"
        : "";
    setError({
      year: errorYear,
      plate: errorPlate,
      price: errorPrice,
      minHour: errorMinHour,
    });
    return (
      errorYear.length === 0 &&
      errorPlate.length === 0 &&
      errorPrice.length === 0 &&
      errorMinHour.length === 0
    );
  };

  return (
    <div>
      <NavBar currentPage={"ListCar"} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>List car</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h6 className={styles.formTitle}>
              Please fill in your car listing information
            </h6>
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Make</label>
            <input
              type="text"
              className={styles.inputBody}
              placeholder="e.g. Toyota"
              spellCheck={false}
              required={true}
              name="make"
              value={form.make}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Model</label>
            <input
              type="text"
              className={styles.inputBody}
              placeholder="e.g. Corolla"
              spellCheck={false}
              required={true}
              name="model"
              value={form.model}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Model year</label>
            <input
              type="text"
              className={styles.inputBody}
              placeholder="2000 - 2021"
              spellCheck={false}
              required={true}
              name="year"
              value={form.year}
              onChange={handleChange}
            />
            {error.year.length > 0 && (
              <span className={styles.inputError}>{error.year}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Licence plate</label>
            <input
              type="text"
              className={styles.inputBody}
              placeholder="ABC123"
              spellCheck={false}
              required={true}
              name="plate"
              value={form.plate}
              onChange={handleChange}
            />
            {error.plate.length > 0 && (
              <span className={styles.inputError}>{error.plate}</span>
            )}
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>List price per hour</label>
            <input
              type="text"
              className={styles.inputBody}
              placeholder="e.g. 20"
              spellCheck={false}
              required={true}
              name="price"
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
              placeholder="1 - 48"
              spellCheck={false}
              required={true}
              name="minHour"
              value={form.minHour}
              onChange={handleChange}
            />
            {error.minHour.length > 0 && (
              <span className={styles.inputError}>{error.minHour}</span>
            )}
          </div>
          <div className="form-group mb-4">
            <label className={styles.inputTitle}>Pickup address</label>
            <input
              type="text"
              className={`${styles.inputBody} ${styles.inputBodyLong}`}
              spellCheck={false}
              required={true}
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <label className={styles.inputTitle}>Upload car image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required={true}
            />
          </div>
          <div className={`form-group ${styles.inputSubmit}`}>
            <LoadingButton
              isLoading={isLoading}
              text={"Submit listing"}
              disabled={
                error.year.length > 0 ||
                error.plate.length > 0 ||
                error.price.length > 0 ||
                error.minHour.length > 0
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListCar;