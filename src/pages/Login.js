import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => {})
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-div-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={this.handleFormSubmit} className="login-form">
        <label>Dirección de correo electrónico:</label>
        <input className="login-form-input" type="email" name="username" value={username} onChange={this.handleChange}/>
        <label>Contraseña:</label>
        <input  className="login-form-input"type="password" name="password" value={password} onChange={this.handleChange} />
        <div className="login-input-submit-container">
        <i id="login-submit" class="fas fa-sign-in-alt" type="submit"></i>
        <input  className="login-input-submit" type="submit" value=""/>
        </div>
      </form>
      </div>
    )
  }
}

export default withAuth(Login);
