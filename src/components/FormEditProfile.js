import React, { Component } from 'react';
import profileService from '../lib/profile-service';
// import FileUpload from './FileUpload';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormEditProfile extends Component {
  state = {
    name: this.props.profile.name,
    username: this.props.profile.username,
    password: "",
    newPassword: "",
    phoneNumber: this.props.profile.phoneNumber,
    imageURL: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    // avatarURL: ''
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

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
  this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('/fotos').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}));
  };

  render() {
    const { name, username, password, newPassword, phoneNumber } = this.state;
    console.log(this.state)
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
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref('/fotos')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
             />
          </form>
      </>
    );
  }
}

export default FormEditProfile;