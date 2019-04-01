import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TripCard extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="tripscard-margin-top">
                <div>
                    <Link to={`/trips/${data._id}`}>
                        <img className="tripcard-image" src={data.imageURL} alt="trip" />
                    </Link>
                </div>
                <h1 className="font-family-montserrat tripcard-title">{data.title}</h1>
                <p className="tripcard-style-p">Itinerario: {data.itinerary}</p>
                <p className="tripcard-style-p">Edad: {data.ageRange} años</p>
            </div>
        );
    }
}

export default TripCard;