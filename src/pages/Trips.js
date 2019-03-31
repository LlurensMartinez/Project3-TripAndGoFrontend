import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard';
import CoursesSearch from '../components/CoursesSearch';


class Trips extends Component {
  state = {
    data: [],
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
        console.log(data)
      })
  }

  filterCompare = (value) => {
    const { data } = this.state;
    this.setState({
      data: [...data].filter(data =>{ 
        console.log(data.title)
        data.title.toLowerCase().includes(value.toLowerCase)})
    })
  }

  render() {
    // const { user } = this.props
    const { data } = this.state;
    return (
      <>
        <div className="trips-margin-div-global">
          <div className="trips-height-tool-bar">
            <CoursesSearch onSearch={this.filterCompare} />
          </div>
          <div className="trips-height-filter">
            <p>Filtros</p>
          </div>
          <div className="trips-div-title-margin">
            <p className="trips-title font-family-montserrat">Viajes más populares</p>
          </div>
          {data.map(singleTrip => (
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