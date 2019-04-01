import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import profileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TripDetail extends Component {

  state = {
    data: [],
    message: "",
    isLoading: true,
    isJoin: false,
    data2: [],
  }

  componentDidMount() {
    tripService.getOne(this.props.match.params.id)
      .then(data => {
        this.setState({
          data: data
        })
      this.checkUserIsJoin();
      this.getProfiles();
      this.loading()
      })
  }

  checkUserIsJoin() {
    const { participants } = this.state.data;
    participants.map(x => {
      if(this.props.user._id === x){
        this.setState({
          isJoin: true,
        })
      }else{
        this.setState({
          isJoin: false,
        })
      }
      
   });
  }

  handleDelete = (e) => {
    e.preventDefault();
    tripService.deleteOne(this.props.match.params.id)
      .then(message => {
        this.setState({
          message,
        })
        this.props.history.goBack();
      })
  }

  handleJoin = (e) => {
    e.preventDefault();
    tripService.joinTrip(this.props.match.params.id)
      .then(message => {
        this.setState({
          message,
        })
        this.props.history.push(`/mytrips`);
      })
  }



  handleLeave = (e) => {
    e.preventDefault();
    tripService.leaveTrip(this.props.match.params.id)
      .then(message => {
        this.setState({
          message,
        })
        this.props.history.push(`/trips`);
      })
  }

  getProfiles = () => {
    const { participants } = this.state.data;
    participants.map((participant) => {
       profileService.getParticipants(participant)
        .then((data) => {
          this.setState({
            data2: [...this.state.data2, data]
          })
        })
    })
  }

  loading = () => {
    this.setState({
      isLoading: false
    })
  }

  // renderProfile = () => {
  //   this.state.data2.map((profile) => {
  //       console.log(profile)
  //   })
  // }

  
  render() {
    
    const { data, isLoading, isJoin, data2 } = this.state;
    
    switch (isLoading) {
      case true:
        return 'loading...';
      case false:
        console.log(data2[0])
        return (
          <div>
            
            <h1>Trip Detail</h1>
            <img width="60px" src={data.imageURL} alt="image" />
            <p>{data.date}</p>
            <p>{data.dateInit}</p>
            <h1>{data.title}</h1>
            <p>{data.itinerary}</p>
            <p>{data.ageRange}</p>
            <h2>Viajeros</h2>
            {data.owner === this.props.user._id
              && <><button onClick={this.handleDelete}>Eliminar</button> <Link to={`/trips/${data._id}/edit`}>Editar</Link></>
            }
            {(data.owner !== this.props.user._id && !isJoin)
              ? <><button onClick={this.handleJoin}>Unirse</button> </> : <><button onClick={this.handleLeave}>Salir</button> </>
            }
            
            <Navbar />
          </div>
        );
      default:
        break;
    }
  }
}

export default withAuth(TripDetail);