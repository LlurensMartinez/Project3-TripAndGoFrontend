import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    imageURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const {username, password, name, phoneNumber, imageURL} = this.state

    this.props.signup({ username, password, name, phoneNumber, imageURL })
      .then((data) => {
        if (data.username) {
          this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: "",
            imageURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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
      <div className="login-div-container">
        <div className="auth-box">
        <div className="login-text-align-center">
            <img className="signup-position-logo" src="/images/avion.png" alt="logo" />
          </div>
          <form onSubmit={this.handleFormSubmit} className="auth-form">
            <input className="auth-font-size login-form-input2 login-form-input" type="text" placeholder="NOMBRE Y APELLIDOS" name="name" value={name} onChange={this.handleChange} />
            <input className="auth-font-size login-form-input2 login-form-input" type="email" placeholder="DIRECCIÓN DE CORREO ELECTRÓNICO" name="username" value={username} onChange={this.handleChange} />
            <input className="auth-font-size login-form-input2 login-form-input" type="password" placeholder="CONTRASEÑA" name="password" value={password} onChange={this.handleChange} />
            <input className="auth-font-size login-form-input2 login-form-input" type="number" placeholder="NÚMERO DE TELÉFONO" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} />
            {this.state.error}
            <div className="text-align-center">
              <input className="auth-form-button-submit login-border-none" type="submit" value="REGÍSTRATE" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withAuth(Signup);