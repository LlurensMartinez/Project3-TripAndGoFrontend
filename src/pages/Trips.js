import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard';


class Trips extends Component {
  state = {
    data: [],
    search:''
  }

  componentDidMount() {
    this.getTripList();
  }

  getTripList = async () => {
    await tripService.getAll()
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  filterCompare = (value) => {
    const { data } = this.state;
    this.setState({
      data: [...data].filter(data => { 
        return data.title.toLowerCase().includes(value.toLowerCase)})
    })
  }

  handleChange = (e) => {
    this.setState({
        search : e.target.value
    })
  }
  
  render() {
    const { data } = this.state;
    const filteredList = data.filter(e=> e.title.toLowerCase().includes(this.state.search.toLocaleLowerCase()));
    return (
      <>
        <div className="trips-margin-div-global">
          <div>
            <input className="tripcard-style-toolbar" onChange={this.handleChange}>
            </input>
          </div>
          <div className="trips-height-filter">
            <p>Filtros</p>
          </div>
          <div className="trips-div-title-margin">
            <p className="trips-title font-family-montserrat">Viajes más populares</p>
          </div>
          {filteredList.map(singleTrip => (
            <TripCard
              data={singleTrip}
            />))}
        </div>
        <Navbar />
      </>
    )
  }
}

export default withAuth(Trips);