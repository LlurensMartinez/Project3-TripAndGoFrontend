import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const name = this.state.name;
    const phoneNumber = this.state.phoneNumber;

    this.props.signup({ username, password, name, phoneNumber })
      .then((data) => {
        if (data.username) {
          this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: ""
          });
        }
        this.setState({
          error: data.response.data.error
        })

      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, name, phoneNumber } = this.state;
    return (
      <div className="signup-div-container">
        <h1>Registro</h1>
        <form onSubmit={this.handleFormSubmit} className="signup-form">
          <label>Nombre y apellidos</label>
          <input className="signup-form-input" type="text" name="name" value={name} onChange={this.handleChange} />
          <label>Dirección de correo electrónico</label>
          <input className="signup-form-input" type="email" name="username" value={username} onChange={this.handleChange} />
          <label>Contraseña</label>
          <input className="signup-form-input" type="password" name="password" value={password} onChange={this.handleChange} />
          {/* <label>Repita la contraseña:</label>
          <input type="password" name="confirmPassword" value={password} onChange={this.handleChange} /> */}
          <label>Número de teléfono</label>
          <input className="signup-form-input" type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} />
          {this.state.error}
          <p id="signup-p">Already have account?
          <Link to={"/login"}> Login</Link>
          </p>
          <div className="signup-input-submit-container">
            <i id="login-submit" class="fas fa-sign-in-alt"></i>
            <input className="login-input-submit" type="submit" value="" />
          </div>
        </form>

      </div>
    )
  }
}

export default withAuth(Signup);