import React, { Component } from 'react';
import tripService from '../lib/trip-services';
import { withRouter } from 'react-router-dom';

class FormCreateTrip extends Component {
  state = {
    title: "",
    description: "",
    itinerary: "",
    date: "",
    dateInit: "",
    ageRange: "18-25",
    numberPersons: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const itinerary = this.state.itinerary;
    const date = this.state.date;
    const dateInit = this.state.dateInit;
    const ageRange = this.state.ageRange;
    const numberPersons = this.state.numberPersons;

    tripService.create({ title, description, itinerary, date, dateInit, ageRange, numberPersons })
      .then((data) => {
        this.props.history.push(`/trips/${data._id}`);
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

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
              <input className="font-family-roboto" type="text" placeholder="Introduce el título de tu viaje" name="title" value={title} onChange={this.handleChange} className="borderTest" />
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
              <input type="number" className="font-family-roboto" placeholder="Número máximo de personas" name="numberPersons" value={numberPersons} onChange={this.handleChange} className="borderTest" />
            </div>
            <div className="formcreatetrip-margin-top">
              <input className="formcreatetrip-button" type="submit" value="Crear viaje" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(FormCreateTrip);