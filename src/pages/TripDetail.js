import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class TripDetail extends Component {

  state = {
    data: [],
    message: "",
  }

  componentDidMount() {
    tripService.getOne(this.props.match.params.id)
      .then(data => {
        this.setState({
          data: data
        })
      })
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

  render() {
    const { data } = this.state;

    console.log(this.props);
    //  if(data.owner == this.props.user._id ){
    return (
      <div>
        <h1>Trip Detail</h1>
        <img width="60px" src="http://tifositours.com/wp-content/uploads/2019/02/Barcelona.jpg" alt="image" />
        <p>{data.date}</p>
        <p>{data.dateInit}</p>
        <h1>{data.title}</h1>
        <p>{data.itinerary}</p>
        <p>{data.ageRange}</p>
        {data.owner === this.props.user._id
          && <><button onClick={this.handleDelete}>Eliminar</button> <Link to={`/trips/${data._id}/edit`}>Editar</Link></>
        }
        {data.owner !== this.props.user._id
          && <><button onClick={this.handleDelete}>Unirse</button> </>
        }
        <Navbar />
      </div>
    );
  }
}

export default withAuth(TripDetail);