import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Moment from 'react-moment';
import 'moment-timezone';

class TripCard extends Component {
    
    handleFav = (e) => {
        const { data } = this.props;
        e.preventDefault();
        profileService.joinFav(data._id)
          .then(message => {
            this.setState({
              message,
            })
          })
      }

    render() {
        const { data, user } = this.props;
        return (
            <div className="tripscard-margin-top">
                <div>
                    {data.owner !== user._id
                        && <><button onClick={this.handleFav}>Favoritos</button></>
                    }
                    <Link to={`/trips/${data._id}`}>
                        <img className="tripcard-image" src={data.imageURL} alt="trip" />
                    </Link>
                </div>
                <Moment diff={data.dateInit}  unit="days">{data.date}</Moment>
                <h1 className="font-family-montserrat tripcard-title">{data.title}</h1>
                <p className="tripcard-style-p">Itinerario: {data.itinerary}</p>
                <p className="tripcard-style-p">Edad: {data.ageRange} años</p>
            </div>
        );
    }
}

export default withAuth(TripCard);