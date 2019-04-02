import React, { Component } from 'react';
import profileService from '../lib/profile-service';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormEditProfile extends Component {
  state = {
    name: this.props.profile.name,
    username: this.props.profile.username,
    password: "",
    newPassword: "",
    phoneNumber: this.props.profile.phoneNumber,
    imageURL: this.props.profile.imageURL,
    avatar: '',
    isUploading: false,
    progress: 0,
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;
    const newPassword = this.state.newPassword;
    const phoneNumber = this.state.phoneNumber;
    const imageURL = this.state.imageURL;



    profileService.edit({ name, username, password, phoneNumber, newPassword, imageURL })
      .then(() => {
        this.props.history.goBack();
      })
      .catch((data) => {
        this.setState({
          error: data.response.data.error
        })
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeUsername = (event) => this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase.storage().ref('/fotos').child(filename).getDownloadURL().then(url => this.setState({ imageURL: url }));
  };

  render() {
    const { name, username, password, newPassword, phoneNumber } = this.state;
    return (
      <>
        <p onClick={this.props.history.goBack}>
          <img src="/images/right-arrow.png" alt="arrow-left" className="size-5vh arrow-back" />
        </p>
        <div className="profile-margin-global formedit-margin-global">
          <form onSubmit={this.handleFormSubmit}>
            <div className="formeditprofile-margin-bottom">
              <label className="profile-titulos">Nombre y apellidos</label>
              <input type="text" name="name" value={name} onChange={this.handleChange} className="profile-username borderTest" />
            </div>
            <div className="formeditprofile-margin-bottom">
              <label className="profile-titulos">Dirección de correo electrónico</label>
              <input className="profile-username borderTest" name="username" value={username} onChange={this.handleChange}>
              </input>
            </div>
            <div className="formeditprofile-margin-bottom">
              <label className="profile-titulos">Contraseña actual</label>
              <input type="password" name="password" value={password} onChange={this.handleChange} className="borderTest profile-username" />
            </div>
            <div className="formeditprofile-margin-bottom">
              <label className="profile-titulos">Nueva contraseña</label>
              <input type="password" name="newPassword" value={newPassword} onChange={this.handleChange} className="profile-username borderTest" />
            </div >
            <div className="formeditprofile-margin-bottom">
              <label className="profile-titulos">Número de teléfono</label>
              <input type="text" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} className="profile-username borderTest" />
            </div>
            <div className="text-align-center">
              <div>
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
              </div>
              <div>
                <input type="submit" value="Guardar" />
              </div>
            </div>
          </form>
          {this.state.error}
        </div>
      </>
    );
  }
}

export default FormEditProfile;