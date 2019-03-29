import React, { Component } from 'react';
import profileService from '../lib/profile-service';

class FormEditProfile extends Component {
  state = {
    name: this.props.profile.name,
    username: this.props.profile.username,
    password: "",
    newPassword: "",
    phoneNumber: this.props.profile.phoneNumber,
  }
 

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const username= this.state.username;
    const password = this.state.password;
    const newPassword = this.state.newPassword;
    const phoneNumber = this.state.phoneNumber;

    profileService.edit({ name, username, password, phoneNumber, newPassword})
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    const { name, username, password, newPassword, phoneNumber } = this.state;
    
    return (
      <>
        <h1>Editar Perfil</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nombre y apellidos</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} className="borderTest" />
          <label>Dirección de correo electrónico</label>
          <textarea name="username" value={username} onChange={this.handleChange}>
          </textarea>
          <label>Contraseña actual</label>
          <input type="text" name="password" value={password} onChange={this.handleChange} className="borderTest" />
          <label>Nueva contraseña</label>
          <input type="text" name="newPassword" value={newPassword} onChange={this.handleChange} className="borderTest" />
          {/* <label>Repita la nueva contraseña</label>
          <input type="text" name="newPassword" value={newPassword} onChange={this.handleChange} className="borderTest" /> */}
          <label>Número de teléfono</label>
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} className="borderTest" />
          <input type="submit" value="Save" />
          
        </form>
      </>
    );
  }
}

export default FormEditProfile;