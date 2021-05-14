import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import Graphics from 'components/utils/graphics';
import LoadingButton from 'components/utils/loadingButton';
import './auth.css';

function SignUp() {
  const history = useHistory();
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
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (form.password.length < 8) {
      setError('Password must have at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      await Auth.signUp({
        username: form.username,
        password: form.password
      });
      history.push('/');
    } catch (error) {
      console.log('error signing up:', error);
      if (error.name === 'UsernameExistsException') {
        setError('User already exists');
      } else if (error.name === 'InvalidParameterException') {
        setError('Username or password must contain valid characters');
      } else {
        let errorMsg = error.message;
        setError((errorMsg.charAt(errorMsg.length-1) === '.') ? errorMsg.slice(0, -1) : errorMsg);
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Graphics/>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h3 className="form-title">Sign Up</h3>
          </div>
          {
            error.length > 0 &&
              <div className="form-group mb-3 form-error">
                <div>{error}</div>
                <div>Please try again</div>
              </div>
          }
          <div className="form-group mb-3">
            <label>Username</label><br />
            <input type="text" className="input-body" placeholder="enter username" spellCheck={false} required={true} name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="form-group mb-4">
            <label>Password</label><br />
            <input type="password" className="input-body" placeholder="enter password" spellCheck={false} required={true} name="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <LoadingButton isLoading={isLoading} text={'Create account'}/>
          </div>
          <div className="form-group mb-3">
            <small>
              Already have an account? <Link className="link" to={"/"}>Login</Link>
            </small>
          </div>
        </form>
      </div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
    </div>
  );
}

export default SignUp;