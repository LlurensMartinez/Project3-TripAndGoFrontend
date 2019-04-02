import React, { Component } from 'react';
import tripService from '../lib/trip-services';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormEditTrip extends Component {
  state = {
    title: this.props.trip.title,
    description: this.props.trip.description,
    itinerary: this.props.trip.itinerary,
    imageURL: this.props.trip.imageURL
  }
 

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description,itinerary,imageURL } = this.state;

    tripService.edit(this.props.trip._id,{ title, description, itinerary, imageURL })
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
    const { title, description, itinerary } = this.state;
    console.log(this.state);
    
    return (
      <>
        <h1>Editar viaje</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Introduce el título de tu viaje</label>
          <input type="text" name="title" value={title} onChange={this.handleChange} className="borderTest" />
          <label>Descripción:</label>
          <textarea name="description" value={description} onChange={this.handleChange}>
          </textarea>
          <label>Itinerario:</label>
          <input type="text" name="itinerary" value={itinerary} onChange={this.handleChange} className="borderTest" />
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
          <input type="submit" value="Editar viaje" />
        </form>
      </>
    );
  }
}

export default FormEditTrip;