import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Moment from 'react-moment';
import 'moment-timezone';

class TripCard extends Component {

    state = {
        data: [],
        isFav: false
    }

    
    componentDidMount () {
        this.checkTripIsFav();

    }
    handleFav = (e) => {
        const { data } = this.props;
        // e.preventDefault();
        profileService.joinFav(data._id)
            .then(message => {
                this.checkTripIsFav();
                this.setState({
                    message,
                })
            })
    }
    handleDeleteFav = (e) => {
        const { data } = this.props;
        // e.preventDefault();
        profileService.deleteFav(data._id)
            .then(message => {
                this.checkTripIsFav();
                if(this.props.getTripFavList){
                    this.props.getTripFavList();
                }
                this.setState({
                    message,
                })
            })
    }

    checkTripIsFav = async() => {
        await profileService.getMyTripsFavs()
            .then(data => {
                this.setState({
                data: data.favTrips,
            })
        })
    }
    render() {
        const { data, user } = this.props;
        const isFav = this.state.data.some(favTrip => favTrip._id === this.props.data._id);
        let divStyle;
        
        if(!isFav){
            divStyle = {
                color: 'green',
              };
        }
        else{
            divStyle = {
                color: 'red',
            };
        }
         
        return (
            <div className="tripscard-margin-top">
                <div>
                    <Link to={`/trips/${data._id}`}>
                        <img className="tripcard-image" src={data.imageURL} alt="trip" />
                    </Link>
                    {/* {data.owner !== user._id
                        && <><button style={divStyle} onClick={this.handleFav}>Favoritos</button> </> 
                    }  */}
                     {data.owner !== user._id
                        && <><button style={divStyle} onClick={() => { !isFav ? 
                            this.handleFav() : 
                            this.handleDeleteFav() }}>Favoritos</button> </> 
                    } 
                </div>
                <p>
                    <Moment diff={data.dateInit} unit="days">{data.date}</Moment> días
                </p>
                <h1 className="font-family-montserrat tripcard-title">{data.title}</h1>
                <p className="tripcard-style-p">Itinerario: {data.itinerary}</p>
                <p className="tripcard-style-p">Edad: {data.ageRange} años</p>
            </div>
        );
    }
}

export default withAuth(TripCard);