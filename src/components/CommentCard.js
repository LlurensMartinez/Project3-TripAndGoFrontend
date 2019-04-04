import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { withAuth } from '../providers/AuthProvider';
import Moment from 'react-moment';
import 'moment-timezone';

class CommentCard extends Component {
    render() {
        return (
            <div className="comment-card-text">
                <p className="blac-comment">{this.props.data.creator.name}: </p>
                <p>{this.props.data.text}</p>
            </div>
        );
    }
}

export default withAuth(CommentCard);