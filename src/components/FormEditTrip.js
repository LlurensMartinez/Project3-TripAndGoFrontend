import React, { Component } from 'react';
import tripService from '../lib/trip-services';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormEditTrip extends Component {
  state = {
    title: this.props.trip.title,
    description: this.props.trip.description,
    itinerary: this.props.trip.itinerary,
    date: this.props.trip.date,
    dateInit: this.props.trip.dateInit,
    ageRange: this.props.trip.ageRange,
    numberPersons: this.props.trip.numberPersons,
  }
 

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description,itinerary,date, dateInit, ageRange, numberPersons,imageURL } = this.state;

    tripService.edit(this.props.trip._id,{ title, description, itinerary, date, dateInit, ageRange, numberPersons, imageURL })
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
    const { title, description, itinerary, date,dateInit, ageRange, numberPersons } = this.state;
    
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
          <label>Fecha Inicio:</label>
          <input type="date" name="dateInit" value={dateInit} onChange={this.handleChange} className="borderTest" />
          <label>Fecha Fin:</label>
          <input type="date" name="date" value={date} onChange={this.handleChange} className="borderTest" />
          <label>Rango de edad:</label>
          <select value={ageRange} name="ageRange" onChange={this.handleChange}>
            <option value="18-25" >18-25</option>
            <option value="25-30">25-30</option>
            <option value="30-40">30-40</option>
            <option value="40-50">40-50</option>
            <option value="+50">+50</option>
          </select>
          <label>Número máximo de personas:</label>
          <input type="number" name="numberPersons" value={numberPersons} onChange={this.handleChange} className="borderTest" />
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