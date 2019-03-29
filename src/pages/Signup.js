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
      .then(() => {
        this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: ""
        });
      })
      .catch(error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, name, phoneNumber } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre y apellidos</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} className="borderTest"/>
          <label>Dirección de correo electrónico:</label>
          <input type="email" name="username" value={username} onChange={this.handleChange} className="borderTest"/>
          <label>Contraseña:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} className="borderTest"/>
          {/* <label>Repita la contraseña:</label>
          <input type="password" name="confirmPassword" value={password} onChange={this.handleChange} /> */}
          <label>Número de teléfono</label>
          <input type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} className="borderTest"/>
          <input type="submit" value="Signup" />
        </form>

        <p>Already have account? 
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);