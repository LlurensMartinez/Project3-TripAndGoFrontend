import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard';


class Trips extends Component {
  state = {
    data: [],
    search: '',
    filterAge: '',
    filterDate:''
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

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    })
  }

  handleChangeAge = (e) => {
    this.setState({
      filterAge: e.target.value,
    })
  }

  handleChangeDataInit = (e) => {
    this.setState({
      filterDate: e.target.value,
    })
  }

  render() {
    const { data } = this.state;
    
    let filteredList = data.filter(e => e.title.toLowerCase().includes(this.state.search.toLocaleLowerCase())
      &&
      e.ageRange.includes(this.state.filterAge) 
      &&
      e.dateInit >= this.state.filterDate
      );
    return (
      <>
        <div className="trips-margin-div-global">
          <div>
            <img className="trips-search" src="/images/search1.png" alt="" />
            <input className="tripcard-style-toolbar" onChange={this.handleChange}>
            </input>
          </div>
          <div className="trips-height-filter">
            <div className="formcreate-margin formcreatetrip-margin-top">
              <select className="formcreatetrip-age-range" value={this.state.filterAge} name="ageRange" onChange={this.handleChangeAge}>
                <option value="">Edad</option>
                <option value="18-25" >18-25</option>
                <option value="25-30">25-30</option>
                <option value="30-40">30-40</option>
                <option value="40-50">40-50</option>
                <option value="+50">+50</option>
              </select>
            </div>
            <input type="date" name="dateInit" value={this.state.filterDate} onChange={this.handleChangeDataInit} className="formcreatetrip-date" />
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