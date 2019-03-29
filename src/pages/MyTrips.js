import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard'

class MyTrips extends Component {
  state = {
    data: []
  }

  componentDidMount(){
    this.getTripList();
  }



  getTripList = async() => {
    await tripService.getMyTrips()
      .then(data => {
        this.setState({
          data: data
        })
      })
  }
  
  render() {
    const { data } = this.state;
    return (
      <div>
        <h1>Mis viajes</h1>
        {data.map(singleTrip => (
        <TripCard
            data={singleTrip}
        />))}
        
        <Navbar />
      </div>
    )
  }
}

export default withAuth(MyTrips);
{/* <h1>Welcome {user.name}</h1> */}