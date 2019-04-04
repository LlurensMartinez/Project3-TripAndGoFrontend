import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Moment from 'react-moment';
import 'moment-timezone';

class CommentCard extends Component {

    state = {
        data: [],
        isFav: false
    }

    //Componentdidmount
    componentDidMount() {
        

    }
   

    render() {
        // const { data, user } = this.props;
        // const isFav = this.state.data.some(favTrip => favTrip._id === this.props.data._id);
        // let imgURL;
        // if (!isFav) {
        //     imgURL = "./images/like2.png"
        // }
        // else {
        //     imgURL = "./images/isfav.png"
        // }

        return (
            <div className="tripscard-margin-top">
                <p>{this.props.data.creator.name}</p>
                <p>{this.props.data.text}</p>
                
                {/* <div>
                    <div className="tripcard-caption">
                        <div className="text-align-right">
                            {data.owner !== user._id
                                && <><button className="tripcard-button-heart" onClick={() => {
                                    !isFav ?
                                        this.handleFav() :
                                        this.handleDeleteFav()
                                }}><img src={imgURL} className="tripcard-style-fav " alt="icon-fav"/></button> </>
                            }
                        </div>
                        <p className="tripcard-date-days">
                            <Moment diff={data.dateInit} unit="days">{data.date}</Moment> días
                    </p>
                    </div>

                    <Link to={`/trips/${data._id}`}>
                        <img className="tripcard-image" src={data.imageURL} alt="trip" />
                    </Link>
                </div>
                <h1 className="font-family-montserrat tripcard-title">{data.title}</h1>
                <p className="tripcard-style-p">Itinerario: {data.itinerary}</p>
                <p className="tripcard-style-p">Edad: {data.ageRange} años</p> */}
            </div>
        );
    }
}

export default withAuth(CommentCard);