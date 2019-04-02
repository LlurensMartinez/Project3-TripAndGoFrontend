import React, { Component } from 'react';
import tripService from '../lib/trip-services';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';


// Clase para crear con un formulario un viaje
class FormCreateTrip extends Component {
  state = {
    title: "",
    description: "",
    itinerary: "",
    date: "",
    dateInit: "",
    ageRange: "18-25",
    numberPersons: "",
    imageURL: 'http://tifositours.com/wp-content/uploads/2019/02/Barcelona.jpg',
    avatar: '',
    isUploading: false,
    progress: 0,
  }

  // Entra aqui al presionar crear viaje en el formulario
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description,itinerary,date, dateInit, ageRange, numberPersons,imageURL } = this.state;
    // se envian los datos introducidos a tripService
    tripService.create({ title, description, itinerary, date, dateInit, ageRange, numberPersons,imageURL })
      .then((data) => {
        // una vez enviado los datos vamos a la pagina donde se mostraran los detalles del viaje creado
        this.props.history.push(`/trips/${data._id}`);
      })
      .catch(error => console.log(error))
  }

  //funcion que registra todo lo que intriducimos en los campos input y lo introduce el el campo que corresponda del state
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  //----------------------Funciones para enviar los datos a firebase-------------------
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
//------------------------Funciones para enviar los datos a firebase--------------------


  render() {
    const { title, description, itinerary, date, dateInit, ageRange, numberPersons } = this.state;
    return (
      <>
        <div className="trips-margin-div-global">
          <div>
            <h1 className="trips-title font-family-montserrat">¡Crea tu propio viaje!</h1>
          </div>
          <form className="formcreatetrip-margin-top" onSubmit={this.handleFormSubmit}>
            <div >
              <input className="font-family-roboto" type="text" placeholder="Introduce el título de tu viaje" name="title" value={title} onChange={this.handleChange} />
            </div>
            <div className="formcreatetrip-margin-top">
              <textarea className="font-family-roboto formcreatetrip-text-area" name="description" placeholder="Descripción del viaje" value={description} onChange={this.handleChange}>
              </textarea>
            </div>
            <div className="formcreatetrip-margin-top">
              <input type="text" placeholder="Itinerario" name="itinerary" value={itinerary} onChange={this.handleChange} className="borderTest" />
            </div>
            <div className="formcreatetrip-margin-top formcreatetrip-flex">
              <div>
                <div>
                  <label className="color-grey">Fecha Inicio:</label>
                </div>
                <div>
                  <input type="date" name="dateInit" value={dateInit} onChange={this.handleChange} className="formcreatetrip-date" />
                </div>
              </div>
              <div>
                <div>
                  <label className="color-grey">Fecha Fin:</label>
                </div>
                <div>
                  <input type="date" name="date" value={date} onChange={this.handleChange} className="formcreatetrip-date" />
                </div>
              </div>
            </div>
            <div className="formcreatetrip-margin-top">
              <label className="color-grey">Rango de edad:</label>
              <select className="formcreatetrip-age-range" value={ageRange} name="ageRange" onChange={this.handleChange}>
                <option value="18-25" >18-25</option>
                <option value="25-30">25-30</option>
                <option value="30-40">30-40</option>
                <option value="40-50">40-50</option>
                <option value="+50">+50</option>
              </select>
            </div>
            <div className="formcreatetrip-margin-top">
              <input type="number" className="font-family-roboto" placeholder="Número máximo de personas" name="numberPersons" value={numberPersons} onChange={this.handleChange} />
            </div>
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
            <footer className="formcreatetrip-footer formcreatetrip-text-align-center">
              <input className="formcreatetrip-button" type="submit" value="Crear viaje" />
            </footer>
          </form>
          {this.state.error}
        </div>
      </>
    );
  }
}

export default withRouter(FormCreateTrip);