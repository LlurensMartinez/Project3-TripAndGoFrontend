import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import TripCard from '../components/TripCard'

class Trips extends Component {
  state = {
    data: []
  }

  componentDidMount(){
    this.getTripList();
  }

  getTripList = async() => {
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
      <div>
        <h1>Viajes mas populares</h1>
        {data.map(singleTrip => (
        <TripCard
            data={singleTrip}
        />))}
        
        <Navbar />
      </div>
    )
  }
}

export default withAuth(Trips);
{/* <h1>Welcome {user.name}</h1> */}