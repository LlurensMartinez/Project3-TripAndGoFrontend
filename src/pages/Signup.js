import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    imageURL: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjw_vDWiK_hAhW_A2MBHZpHAiMQjRx6BAgBEAU&url=https%3A%2F%2Fwww.fotolia.com%2Ftag%2F%2522default%2520profile%2520picture%2522&psig=AOvVaw0-W1GC7yueSSBIzHAXvzIf&ust=1554214047329368"
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;
    const name = this.state.name;
    const phoneNumber = this.state.phoneNumber;
    const imageURL = this.state.ImageURL;

    this.props.signup({ username, password, name, phoneNumber, imageURL })
      .then((data) => {
        if (data.username) {
          this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: "",
            imageURL: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjw_vDWiK_hAhW_A2MBHZpHAiMQjRx6BAgBEAU&url=https%3A%2F%2Fwww.fotolia.com%2Ftag%2F%2522default%2520profile%2520picture%2522&psig=AOvVaw0-W1GC7yueSSBIzHAXvzIf&ust=1554214047329368"
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