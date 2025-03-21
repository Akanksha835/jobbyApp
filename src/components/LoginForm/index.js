import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorOccured: false,
  }
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }
  onSubmitFail = err => {
    this.setState({errorMsg: err, errorOccured: true})
  }
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.onSubmitFail(data.err_msg)
    }
  }
  render() {
    const {username, password, errorMsg, errorOccured} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="form-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="form-input"
            id="username"
            type="text"
            value={username}
            onChnage={this.onChangeUsername}
            placeholder="username"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            id="password"
            type="password"
            value={password}
            onChnage={this.onChangePassword}
            placeholder="password"
          />
          <br />
          <br />
          <button className="login-btn" type="submit">
            Login
          </button>
          {errorOccured && <p className="err">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
