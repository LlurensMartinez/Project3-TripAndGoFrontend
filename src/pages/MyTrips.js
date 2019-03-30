import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard'

class MyTrips extends Component {
  state = {
    data: [],
    dataJoin: [],
  }

  componentDidMount() {
    this.getTripCreateList();
    this.getTripJoinList();
  }



  getTripCreateList = async () => {
    await tripService.getMyTrips()
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  getTripJoinList = async () => {
    await tripService.getMyTripsJoin()
      .then(data => {
        this.setState({
          dataJoin: data
        })
      })
  }

  render() {
    const { data, dataJoin } = this.state;
    return (
      <>
        <div className="trips-margin-div-global mytrips-margin-top-global">
          <h1 className="trips-title font-family-montserrat">Mis viajes</h1>
          {data.map(singleTrip => (
            <TripCard
              data={singleTrip}
            />))}
        <h1 className="trips-title font-family-montserrat">Viajes confirmados</h1>
        {dataJoin.map(singleTrip => (
            <TripCard
              data={singleTrip}
            />))}
        </div>
        <Navbar />
      </>
    )
  }
}

export default withAuth(MyTrips);
