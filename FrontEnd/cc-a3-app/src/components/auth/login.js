import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { useAppContext } from "libs/context";
import Graphics from 'components/utils/graphics';
import LoadingButton from 'components/utils/loadingButton';
import styles from './auth.module.css';
import config from 'config';

function Login() {
  const history = useHistory();
  const { setAuthentication } = useAppContext();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(form.username, form.password);
      const username = localStorage.getItem('CognitoIdentityServiceProvider.' + config.cognito.APP_CLIENT_ID + '.LastAuthUser');
      const accessToken = localStorage.getItem('CognitoIdentityServiceProvider.' + config.cognito.APP_CLIENT_ID + '.' + username + '.accessToken');
      setAuthentication({
        isAuthenticated: true,
        username: username,
        accessToken: accessToken,
      });
      history.push('/dashboard');
    } catch (error) {
      console.log('error signing in', error);
      let errorMsg = error.message;
      setError((errorMsg.charAt(errorMsg.length-1) === '.') ? errorMsg.slice(0, -1) : errorMsg);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Graphics/>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h3 className={styles.formTitle}>Welcome!</h3>
          </div>
          {
            error.length > 0 &&
              <div className={`form-group mb-3 ${styles.formError}`}>
                <div>{error}</div>
                <div>Please try again</div>
              </div>
          }
          <div className="form-group mb-3">
            <label>Username</label><br />
            <input type="text" className={styles.inputBody} placeholder="enter username" spellCheck={false} required={true} name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="form-group mb-4">
            <label>Password</label><br />
            <input type="password" className={styles.inputBody} placeholder="enter password" spellCheck={false} required={true} name="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <LoadingButton isLoading={isLoading} text={'Login'} disabled={false}/>
          </div>
          <div className="form-group mb-3">
            <small>
              Don't have an account? <Link className="link" to={"/signup"}>Sign Up</Link>
            </small>
          </div>
        </form>
      </div>
      <div className={`${styles.wave} ${styles.wave1}`}></div>
      <div className={`${styles.wave} ${styles.wave2}`}></div>
    </div>
  );
}

export default Login;