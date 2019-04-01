import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import profileService from '../lib/profile-service';
import TripCard from '../components/TripCard'

class TripFavs extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    // this.getTripCreateList();

    this.getTripFavList();
  }



  // getTripCreateList = async () => {
  //   await tripService.getMyTrips()
  //     .then(data => {
  //       this.setState({
  //         data: data
  //       })
  //     })
  // }

  getTripFavList = async () => {
   
    await profileService.getMyTripsFavs()
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="trips-margin-div-global mytrips-margin-top-global">
          {/* <h1 className="trips-title font-family-montserrat">Favorites</h1>
          {data.map(singleTrip => (
            <TripCard
              data={singleTrip}
            />))} */}
        <h1 className="trips-title font-family-montserrat">Favorites</h1>
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

export default withAuth(TripFavs);