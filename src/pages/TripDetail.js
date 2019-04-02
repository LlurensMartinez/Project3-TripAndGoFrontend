import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import tripService from '../lib/trip-services';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Moment from 'react-moment';
import 'moment-timezone';

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
          isLoading: false
        })
        this.checkUserIsJoin();
      })
  }

  checkUserIsJoin = () => {
    const { participants } = this.state.data;
    const isJoin = participants.some(participant => participant._id === this.props.user._id);
    this.setState({
      isJoin
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

  renderProfiles = () => {
    const { participants } = this.state.data;
    return participants.map((profile) => {
      return <Link to={`/profile/${profile._id}`}><img key={profile._id} src={profile.imageURL} alt="profile" className="tripdetail-sizeimage" /></Link>
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
            <img className="tripdetail-image" src={data.imageURL} alt="trip" />
            <div className="tripdetail-margin-global">
              <h1 className="tripdetail-title">{data.title}</h1>

              <div className="tripdetail-displayflex">
                <img className="tripdetail-icons" src="/images/calendar.png" />
                <Moment className="tripdetail-padding-top" format="DD/MM/YYYY">{data.date}</Moment>
                <Moment className="tripdetail-padding-top" format="DD/MM/YYYY">{data.dateInit}</Moment>
              </div>
              <div className="tripdetail-displayflex">
                <div>
                  <img className="tripdetail-icons" src="/images/itinerario.png" />
                </div>
                <div>
                  <pre className="tripdetail-padding-top">{data.itinerary}</pre>
                </div>
              </div>
              <div className="tripdetail-displayflex">
                <img className="tripdetail-icons" src="/images/usuaris.png" />
                <p className="tripdetail-padding-top">{data.ageRange} años</p>
              </div>
              <div className="tripdetail-padding-users">
                {this.renderProfiles()}
                {data.owner === this.props.user._id
                  && <><button onClick={this.handleDelete}>Eliminar</button> <Link to={`/trips/${data._id}/edit`}>Editar</Link></>
                }
                {(data.owner !== this.props.user._id && !isJoin && (data.numberPersons > data.participants.length))
                  ? <><button onClick={this.handleJoin}>Unirse</button> </> : <> </>
                }
                {(data.owner !== this.props.user._id && isJoin)
                  ? <><button onClick={this.handleLeave}>Salir</button> </> : <></>
                }
              </div>
              <div className="tripdetail-barra"></div>
              <p className="tripedetail-description">Descripción</p>
              <pre className="tripdetail-text-description">{data.description}</pre>
            </div>
            <Navbar />
          </div>
        );
      default:
        break;
    }
  }
}

export default withAuth(TripDetail);