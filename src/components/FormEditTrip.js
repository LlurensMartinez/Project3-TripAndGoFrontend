import React, { Component } from 'react';
import tripService from '../lib/trip-services';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormEditTrip extends Component {
  state = {
    title: this.props.trip.title,
    description: this.props.trip.description,
    itinerary: this.props.trip.itinerary,
    imageURL: this.props.trip.imageURL,
    avatar: '',
    isUploading: false,
    progress: 0,
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description, itinerary, imageURL } = this.state;

    tripService.edit(this.props.trip._id, { title, description, itinerary, imageURL })
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
    const { title, description, itinerary } = this.state;
    return (
      <>
        <p onClick={this.props.history.goBack}>
          <img src="/images/right-arrow.png" alt="arrow-left" className="size-5vh arrow-back" />
        </p>
        <div className="formedittrip-margin-top-global trips-margin-div-global">
          <div>
            <h1 className="formedittrip-margin-bottom trips-title font-family-montserrat">Editar viaje</h1>
          </div>
          <form className="formcreatetrip-margin-top" onSubmit={this.handleFormSubmit}>
            <div>
              <label className="profile-titulos">Título</label>
              <input className=" formcreate-padding-top borderTest font-family-roboto" name="title" value={title} onChange={this.handleChange} />
            </div>
            <div className="formcreatetrip-margin-top formcreate-padding-top">
              <label className="profile-titulos">Descripción</label>
              <textarea className="font-family-roboto formcreatetrip-text-area" name="description" rows="10" value={description} onChange={this.handleChange}></textarea>
            </div>
            <div className="formcreate-padding-top formcreatetrip-margin-top">
              <label className="profile-titulos">Itinerario</label>
              <textarea className="formcreatetrip-text-area" type="text" rows="10" cols="50" name="itinerary" value={itinerary} onChange={this.handleChange} />
            </div>
            <div>  
            {this.state.isUploading &&
            <p>Progress: Uploading...</p>
            }
            {this.state.imageURL &&
            <img src={this.state.imageURL} className="tripdetail-image" alt="trip"/>
            }
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
              <input className="formcreatetrip-button" type="submit" value="Editar viaje" />
            </div>
          </form>
        
          {this.state.error}
        </div>
      </>
    );
  }
}

export default FormEditTrip;