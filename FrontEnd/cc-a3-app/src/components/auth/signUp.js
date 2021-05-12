import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './auth.css';
import Graphics from 'components/utils/graphics';

function SignUp(props) {
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
    try {
      const { user } = await Auth.signUp({
        username: form.username,
        password: form.password
      });
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
    // props.history.push('/login');
  }

  return (
    <div>
      <Graphics/>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h3 className="form-title">Sign Up</h3>
          </div>
          <div className="form-group mb-3">
            <label>Username</label><br />
            <input type="text" className="input-body" placeholder="enter username" spellCheck={false} required={true} name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="form-group mb-4">
            <label>Password</label><br />
            <input type="password" className="input-body" placeholder="enter password" spellCheck={false} required={true} name="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <input type="submit" className="btn-apply" value="Create account" />
          </div>
          <div className="form-group mb-3">
            <small>
              Already have an account? <Link className="link" to={"/login"}>Login</Link>
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