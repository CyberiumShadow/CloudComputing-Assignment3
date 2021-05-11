import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom"
import './auth.css'
import Graphics from './graphics.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    alert(this.state.username + ' ' + this.state.password);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Graphics/>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mb-4">
              <h3 className="form-title">Welcome!</h3>
            </div>
            <div className="form-group mb-3">
              <label>Username</label><br />
              <input type="text" className="input-body" placeholder="enter username" spellCheck="false" required="true" name="username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="form-group mb-4">
              <label>Password</label><br />
              <input type="password" className="input-body" placeholder="enter password" spellCheck="false" required="true" name="password" value={this.state.password} onChange={this.handleChange} />
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
}

export default Login;