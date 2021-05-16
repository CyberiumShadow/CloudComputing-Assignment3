import React, { useState, useEffect } from 'react';
import NavBar from 'components/utils/navBar';
import styles from './main.module.css';
import LoadingButton from 'components/utils/loadingButton';

function ListCar() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    minHour: '',
    address: ''
  });

  const [error, setError] = useState({
    year: '',
    price: '',
    minHour: ''
  });

  useEffect(() => {
    formValidation();
  }, [form]);

  const formValidation = () => {
    const numbers = /^[0-9]+$/;
    setError({
      year: (form.year.length > 0 && !form.year.match(numbers)) ? 'Model year must be numeric' : '',
      price: (form.price.length > 0 && !form.price.match(numbers)) ? 'List price must be numeric' : '',
      minHour: (form.minHour.length > 0 && !form.minHour.match(numbers)) ? 'Minimum hour must be numeric' : ''
    });
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage({
        image: URL.createObjectURL(img)
      });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // setIsLoading(true);
    if (!isSubmissionValid()) return;
    console.log('success', form, image);
    // setIsLoading(false);
  }

  const isSubmissionValid = () => {
    var errorYear = ((parseInt(form.year) < 2000 || parseInt(form.year) > 2021)) ? 'Model year must be between 2000 and 2021' : '';
    var errorPrice = (parseInt(form.price) == 0) ? 'List price must be more than zero' : '';
    var errorMinHour = (parseInt(form.minHour) < 1 || parseInt(form.minHour) > 48) ? 'Minimum hour must be between 1 and 48' : '';
    setError({
      year: errorYear,
      price: errorPrice,
      minHour: errorMinHour,
    });
    return (errorYear.length === 0 && errorPrice.length === 0 && errorMinHour.length === 0);
  }
  
  return (
    <div>
      <NavBar currentPage={'ListCar'} />
      <div className={styles.contentWrapper}>
        <h3 className={styles.pageTitle}>List car</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h6 className={styles.formTitle}>Please fill in your car listing information</h6>
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Make</label>
            <input type="text" className={styles.inputBody} placeholder="e.g. Toyota" spellCheck={false} required={true} name="make" value={form.make} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Model</label>
            <input type="text" className={styles.inputBody} placeholder="e.g. Corolla" spellCheck={false} required={true} name="model" value={form.model} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Model Year</label>
            <input type="text" className={styles.inputBody} placeholder="2000 - 2021" spellCheck={false} required={true} name="year" value={form.year} onChange={handleChange} />
            {
              error.year.length > 0 &&
               <span className={styles.inputError}>{error.year}</span>
            }
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>List price per hour</label>
            <input type="text" className={styles.inputBody} placeholder="e.g. 20" spellCheck={false} required={true} name="price" value={form.price} onChange={handleChange} />
            {
              error.price.length > 0 &&
               <span className={styles.inputError}>{error.price}</span>
            }
          </div>
          <div className="form-group mb-3">
            <label className={styles.inputTitle}>Minimum hour</label>
            <input type="text" className={styles.inputBody} placeholder="1 - 48" spellCheck={false} required={true} name="minHour" value={form.minHour} onChange={handleChange} />
            {
              error.minHour.length > 0 &&
               <span className={styles.inputError}>{error.minHour}</span>
            }
          </div>
          <div className="form-group mb-4">
            <label className={styles.inputTitle}>Pickup address</label>
            <input type="text" className={`${styles.inputBody} ${styles.inputBodyLong}`} spellCheck={false} required={true} name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group mb-4">
            <label className={styles.inputTitle}>Upload car image</label>
            <input type="file" name="image" onChange={handleImageChange} required={true} />
          </div>
          <div className={`form-group ${styles.inputSubmit}`}>
            <LoadingButton isLoading={isLoading} text={'Submit listing'} disabled={error.year.length > 0 || error.price.length > 0 || error.minHour.length > 0}/>
          </div>
        </form>     
      </div>
    </div>
  );
}

export default ListCar;