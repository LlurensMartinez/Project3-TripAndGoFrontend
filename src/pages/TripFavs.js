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

  getTripFavList = async () => {
   await profileService.getMyTripsFavs()
      .then(data => {
        this.setState({
          data: data.favTrips
        })
      })
  }

  render() {
    const { data } = this.state;
    console.log("holaaaaaa",data);
    return (
      <>
        <div className="trips-margin-div-global mytrips-margin-top-global">
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