import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import FormComment from '../components/FormComment';
import CommentCard from '../components/CommentCard';
import tripService from '../lib/trip-services';
import commentService from '../lib/comment-service';
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
    dataComments: [],
  }

  componentDidMount() {
    tripService.getOne(this.props.match.params.id)
      .then(data => {
        this.setState({
          data: data,
          isLoading: false
        })
        this.checkUserIsJoin();
        this.checkIntro();
        this.getCommentsList();
      })
  }

  getCommentsList = async () => {
    await commentService.getCommentsTrip(this.state.data._id)
      .then(data => {
        this.setState({
          dataComments: data
        })
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
        this.componentDidMount();
      })
  }


  handleLeave = (e) => {
    e.preventDefault();
    tripService.leaveTrip(this.props.match.params.id)
      .then(message => {
        this.setState({
          message,
        })
        this.componentDidMount();
      })
  }

  renderProfiles = () => {
    const { participants } = this.state.data;
    return participants.map((profile) => {
      return <Link to={`/profile/${profile._id}`}><img key={profile._id} src={profile.imageURL} alt="profile" className="tripdetail-sizeimage" /></Link>
    })
  }


  render() {

    const { data, isLoading, isJoin, dataComments } = this.state;
    
    switch (isLoading) {
      case true:
        return 'loading...';
      case false:
        return (
          <div className="margin-bottom-trip-detail">
            {data.owner === this.props.user._id
              && <div className="text-align-right"><button className="tripdetail-button-never-effect" onClick={this.handleDelete}><img className="tripdetail-size-image-delete" src="/images/delete.png" alt="icon-delete"/></button></div>
            }
            <img className="tripdetail-image" src={data.imageURL} alt="trip" />
            <div className="tripdetail-margin-global">
              <div className="tripdetail-float">
                <h1 className="tripdetail-title">{data.title}</h1>
                {data.owner === this.props.user._id
                  && <Link to={`/trips/${data._id}/edit`}><img className="tripdetail-size-image-edit" src="/images/edit.png" alt="icon" /></Link>
                }
                {(data.owner !== this.props.user._id && !isJoin && (data.numberPersons > data.participants.length))
                  ? <><button className="trip-detail-button" onClick={this.handleJoin}><img className="trip-detail-image" src="/images/add-user.png" alt="icon"/></button> </> : <> </>
                }
                {(data.owner !== this.props.user._id && isJoin)
                  ? <><button className="trip-detail-button" onClick={this.handleLeave}><img className="trip-detail-image" src="/images/remove-user.png" alt="icon"/></button> </> : <></>
                }
              </div>
              <div className="tripdetail-displayflex">
                <img className="tripdetail-icons" src="/images/calendar.png" alt="icon" />
                <Moment className="tripdetail-padding-top" format="DD/MM/YYYY">{data.dateInit}</Moment>
                <Moment className="tripdetail-padding-top" format="DD/MM/YYYY">{data.date}</Moment>
              </div>
              <div className="tripdetail-displayflex">
                <div>
                  <img className="tripdetail-icons" src="/images/itinerario.png" alt="icon"/>
                </div>
                <div>
                  <p className="tripdetail-padding-top">{data.itinerary}</p>
                </div>
              </div>
              <div className="tripdetail-displayflex">
                <img className="tripdetail-icons" src="/images/usuaris.png" alt="icon-trip"/>
                <p className="tripdetail-padding-top">{data.ageRange} años</p>
              </div>
              <div className="tripdetail-padding-users">
                {this.renderProfiles()}
              </div>
              <div className="tripdetail-barra"></div>
              <p className="tripedetail-description">Descripción</p>
              <p className="tripdetail-text-description">{data.description}</p>
              <div className="tripdetail-barra"></div>
              <p className="tripedetail-description">Comentarios</p>
              <div className="tripdetail-comments-box">
              {dataComments.map(singleComment => (
              <CommentCard
                key={singleComment._id}
                data={singleComment}
              />))}
              </div>
            <FormComment
               trip={data}
               getCommentsList = {this.getCommentsList}
            />
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