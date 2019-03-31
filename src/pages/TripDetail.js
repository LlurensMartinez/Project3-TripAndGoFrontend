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
  }

  componentDidMount() {
    tripService.getOne(this.props.match.params.id)
      .then(data => {
        this.setState({
          data: data,
          isLoading: false,
        })
        this.checkUserIsJoin();
      })
  }

  checkUserIsJoin() {
    const { participants } = this.state.data;
    let idUsersJoin = participants.map(x => {
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

  renderList(){
    let { participants } = this.state.data;
    // const { name } = this.props.user
    let test = participants.map((participant) => {
       profileService.getParticipants(participant)
                  .then((data) => {
                    console.log(data)
                  })
    })
  }

  
  render() {
    const { data, isLoading, isJoin } = this.state;
    switch (isLoading) {
      case true:
        return 'loading...';
      case false:
        return (
          <div>
            <h1>Trip Detail</h1>
            <img width="60px" src="http://tifositours.com/wp-content/uploads/2019/02/Barcelona.jpg" alt="image" />
            <p>{data.date}</p>
            <p>{data.dateInit}</p>
            <h1>{data.title}</h1>
            <p>{data.itinerary}</p>
            <p>{data.ageRange}</p>
            <h2>Viajeros</h2>
            {this.renderList()}
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