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
      <form onSubmit={this.handleFormSubmit}>
        <label>Dirección de correo electrónico:</label>
        <input type="email" name="username" value={username} onChange={this.handleChange}/>
        <label>Contraseña:</label>
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default withAuth(Login);
