import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard'


class Trips extends Component {
  state = {
    data: []
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

  render() {
    // const { user } = this.props
    const { data } = this.state;
    return (
      <>
        <div className="trips-margin-div-global">
          <div className="trips-height-tool-bar">
            <p>Barra de búsqueda</p>
          </div>
          <div className="trips-height-filter">
            <p>Filtros</p>
          </div>
          <div>
            <p className="trips-title">Viajes más populares</p>
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
{/* <h1>Welcome {user.name}</h1> */ }