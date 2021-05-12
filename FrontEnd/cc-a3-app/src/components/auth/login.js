import React, { Component } from 'react';
import './auth.css';
import Graphics from 'components/utils/graphics';
import { connect } from 'react-redux'
import cognitoUtils from 'lib/cognitoUtils'
import request from 'request'
import appConfig from 'config/app-config.json'

const mapStateToProps = state => {
  return { session: state.session }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      apiStatus: 'Not called' 
    }
  }

  componentDidMount () {
    if (this.props.session.isLoggedIn) {
      // Call the API server GET /users endpoint with our JWT access token
      const options = {
        url: `${appConfig.apiUri}/users`,
        headers: {
          Authorization: `Bearer ${this.props.session.credentials.accessToken}`
        }
      }

      this.setState({ apiStatus: 'Loading...' })
      request.get(options, (err, resp, body) => {
        let apiStatus, apiResponse
        if (err) {
          // is API server started and reachable?
          apiStatus = 'Unable to reach API'
          console.error(apiStatus + ': ' + err)
        } else if (resp.statusCode !== 200) {
          // API returned an error
          apiStatus = 'Error response received'
          apiResponse = body
          console.error(apiStatus + ': ' + JSON.stringify(resp))
        } else {
          apiStatus = 'Successful response received.'
          apiResponse = body
        }
        this.setState({ apiStatus, apiResponse })
      })
    }
  }

  render() {
    return (
      <div>
        <Graphics/>
        <div className="form-wrapper">
            <a href={cognitoUtils.getCognitoSignInUri()}>Login here</a>
        </div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login)