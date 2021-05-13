import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAppContext } from "libs/context";
import Graphics from 'components/utils/graphics';
import './auth.css';

function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

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
    try {
      const { user } = await Auth.signIn(form.username, form.password);
      userHasAuthenticated(true);
      history.push('/dashboard');
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  return (
    <div>
      <Graphics/>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <h3 className="form-title">Welcome!</h3>
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
            <input type="submit" className="btn-apply" value="Login" />
          </div>
          <div className="form-group mb-3">
            <small>
              Don't have an account? <Link className="link" to={"/signup"}>Sign Up</Link>
            </small>
          </div>
        </form>
      </div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
    </div>
  );
}

export default Login;