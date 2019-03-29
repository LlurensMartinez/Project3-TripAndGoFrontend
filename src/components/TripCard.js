import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TripCard extends Component {
    render() {
    const {data} = this.props;
        return (
            <div>
                <Link to={`/trips/${data._id}`}>
                    <img width="60px" src="http://tifositours.com/wp-content/uploads/2019/02/Barcelona.jpg" alt="image"/>
                </Link>
                <p>{data.date}</p>
                <p>{data.dateInit}</p>
                <h1>{data.title}</h1>
                <p>{data.itinerary}</p>
                <p>{data.ageRange}</p>
            </div>
        );
    }
}

export default TripCard;