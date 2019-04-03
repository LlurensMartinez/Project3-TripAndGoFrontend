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
    let filteredList = data.filter(e=> e.title.toLowerCase().includes(this.state.search.toLocaleLowerCase()));
    filteredList = data.filter(e=> e.title.toLowerCase().includes(this.state.search.toLocaleLowerCase()));
    return (
      <>
        <div className="trips-margin-div-global">
          <div>
            <img className="trips-search" src="/images/search1.png" alt=""/>
            <input className="tripcard-style-toolbar" onChange={this.handleChange}>
            </input>
          </div>
          <div className="trips-height-filter">
          <div className="formcreate-margin formcreatetrip-margin-top">
              <select className="formcreatetrip-age-range" value="" name="ageRange" onChange={this.handleChange}>
                <option value="18-25" >18-25</option>
                <option value="25-30">25-30</option>
                <option value="30-40">30-40</option>
                <option value="40-50">40-50</option>
                <option value="+50">+50</option>
              </select>
            </div>
          </div>
          <div className="trips-div-title-margin">
            <p className="trips-title font-family-montserrat">Viajes más populares</p>
          </div>
          {filteredList.map(singleTrip => (
            <TripCard
              key={singleTrip._id}
              data={singleTrip}
            />))}
        </div>
        <Navbar />
      </>
    )
  }
}

export default withAuth(Trips);