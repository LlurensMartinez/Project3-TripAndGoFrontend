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

    this.props.signup({ username, password, name, phoneNumber,imageURL })
      .then(() => {
        this.setState({
            username: "",
            password: "",
            name: "",
            phoneNumber: "",
            imageURL: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjw_vDWiK_hAhW_A2MBHZpHAiMQjRx6BAgBEAU&url=https%3A%2F%2Fwww.fotolia.com%2Ftag%2F%2522default%2520profile%2520picture%2522&psig=AOvVaw0-W1GC7yueSSBIzHAXvzIf&ust=1554214047329368"
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
      <div className="signup-div-container">
        <h1>Registro</h1>
        <form onSubmit={this.handleFormSubmit} className="signup-form">
          <label>Nombre y apellidos</label>
          <input className="signup-form-input" type="text" name="name" value={name} onChange={this.handleChange} />
          <label>Dirección de correo electrónico</label>
          <input  className="signup-form-input" type="email" name="username" value={username} onChange={this.handleChange} />
          <label>Contraseña</label>
          <input  className="signup-form-input" type="password" name="password" value={password} onChange={this.handleChange} />
          {/* <label>Repita la contraseña:</label>
          <input type="password" name="confirmPassword" value={password} onChange={this.handleChange} /> */}
          <label>Número de teléfono</label>
          <input className="signup-form-input" type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange}/>
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