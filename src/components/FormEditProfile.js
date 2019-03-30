import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import FileUpload from './FileUpload';



class FormEditProfile extends Component {
  state = {
    name: this.props.profile.name,
    username: this.props.profile.username,
    password: "",
    newPassword: "",
    phoneNumber: this.props.profile.phoneNumber,
    imageURL: ""
  }
 

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const username= this.state.username;
    const password = this.state.password;
    const newPassword = this.state.newPassword;
    const phoneNumber = this.state.phoneNumber;
    const imageURL = this.state.imageURL;

    profileService.edit({ name, username, password, phoneNumber, newPassword, imageURL})
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getImageURL = (image) => {
    this.setState ({
      imageURL:image
    })
  }
  // handleChangeUsername = (event) => this.setState({username: event.target.value});
  // handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  // handleProgress = (progress) => this.setState({progress});
  // handleUploadError = (error) => {
  // this.setState({isUploading: false});
  // console.error(error);
  // }
  // handleUploadSuccess = (filename) => {
  // this.setState({avatar: filename, progress: 100, isUploading: false});
  // firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  // };

  render() {
    const { name, username, password, newPassword, phoneNumber } = this.state;
    console.log(this.state.imageURL)
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
          <input type="password" name="password" value={password} onChange={this.handleChange} className="borderTest" />
          <label>Nueva contraseña</label>
          <input type="password" name="newPassword" value={newPassword} onChange={this.handleChange} className="borderTest" />
          {/* <label>Repita la nueva contraseña</label>
          <input type="text" name="newPassword" value={newPassword} onChange={this.handleChange} className="borderTest" /> */}
          <label>Número de teléfono</label>
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} className="borderTest" />
          <input type="submit" value="Save" />
          </form>
          <FileUpload getImageURL={this.getImageURL}/>
      </>
    );
  }
}

export default FormEditProfile;