import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    this.props.login({ username, password })
      .then((data) => {
        if(!data.username){
          this.setState({
            error: data.response.data.error
          })
        }
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-div-container">
        <div className="login-box">
          <div className="login-text-align-center">
            <img className="login-position-logo" src="/images/logo-blanco.png" alt="logo" />
          </div>
          <form onSubmit={this.handleFormSubmit} className="login-form">
            <label className="login-label-email">EMAIL</label>
            <input className="login-form-input2 login-form-input" type="email" name="username" value={username} onChange={this.handleChange} />
            <input placeholder="PASSWORD" className=" login-margin-top login-form-input" type="password" name="password" value={password} onChange={this.handleChange} />
            {this.state.error}
              <button className="login-form-button-submit login-border-none" type="submit">INICIAR SESIÓN</button>
            <div className="login-dont-have-account">
            <p>¿No tienes una cuenta?</p>
              <p><Link className="color-black" to='/signup'>¡Registrate!</Link></p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withAuth(Login);
