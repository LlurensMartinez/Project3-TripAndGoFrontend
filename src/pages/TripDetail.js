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
        // Formating comments, to replace \b by <br>
        let comments = document.querySelectorAll('.comment-text p');
        comments.forEach((comment) => {
          let content = comment.innerHTML.replace(/\n/g, '<br>');
          comment.innerHTML = content;
        });
        this.setState({
          data: data,
          isLoading: false
        })
        this.checkUserIsJoin();
        this.checkIntro();
      })
  }

  checkIntro = () =>{
    // Formating comments, to replace \b by <br>
    let comments = document.querySelectorAll('p');
    comments.forEach((comment) => {
        let content = comment.innerHTML.replace(/\n/g, '<br>');
        comment.innerHTML = content;
    });
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
          <div className="margin-bottom-trip-detail">
            {data.owner === this.props.user._id
              && <div className="text-align-right"><button className="tripdetail-button-never-effect" onClick={this.handleDelete}><img className="tripdetail-size-image-delete" src="/images/delete.png" /></button></div>
            }
            <img className="tripdetail-image" src={data.imageURL} alt="trip" />
            <div className="tripdetail-margin-global">
              <div className="tripdetail-float">
                <h1 className="tripdetail-title">{data.title}</h1>
                {data.owner === this.props.user._id
                  && <Link to={`/trips/${data._id}/edit`}><img className="tripdetail-size-image-edit" src="/images/pencil-edit-button.png" /></Link>
                }
                {(data.owner !== this.props.user._id && !isJoin && (data.numberPersons > data.participants.length))
                  ? <><button className="trip-detail-button" onClick={this.handleJoin}><img className="trip-detail-image" src="/images/add-user.png"/></button> </> : <> </>
                }
                {(data.owner !== this.props.user._id && isJoin)
                  ? <><button className="trip-detail-button" onClick={this.handleLeave}><img className="trip-detail-image" src="/images/remove-user.png"/></button> </> : <></>
                }
              </div>
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
                  <p className="tripdetail-padding-top">{data.itinerary}</p>
                </div>
              </div>
              <div className="tripdetail-displayflex">
                <img className="tripdetail-icons" src="/images/usuaris.png" />
                <p className="tripdetail-padding-top">{data.ageRange} años</p>
              </div>
              <div className="tripdetail-padding-users">
                {this.renderProfiles()}
              </div>
              <div className="tripdetail-barra"></div>
              <p className="tripedetail-description">Descripción</p>
              <p className="tripdetail-text-description">{data.description}</p>
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