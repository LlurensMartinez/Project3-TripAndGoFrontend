import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Profile extends Component {

    state = {
    data:{}
    
  }
  componentDidMount() {
    const { id } = this.props.match.params
    profileService.getProfile(id)
    .then(data => {
      this.setState({
        data: data
      })
    })
  }
  render() {
    const {_id, name, username, phoneNumber,imageURL} = this.state.data;
    const { logout, user } = this.props;

    return (
      <>
      <div className="nav-top">
        <div>
        <p onClick={this.props.history.goBack}>
          <img src="/images/right-arrow.png" alt="arrow-left" className="size-5vh arrow-back"/>
        </p>
      </div>
      </div>
        <h1>Profile</h1>
        <img src={imageURL} alt="" width="200px"/ >
        <h1>{name}</h1>
        <h3>Dirección de correo electrónico</h3>
        <h3>{username}</h3>
        <h3>Número de teléfono</h3>
        <h3>{phoneNumber}</h3>
        {_id === this.props.user._id
              && <> <Link to={`/profile/${user._id}/edit`}>
                       <img src="/images/profile-edit.png" alt="profile-edit" className="size-5vh arrow-back"/>
                    </Link>  
                    <p onClick={logout}>Logout</p></> 
        }
      </>
    );
  }
}

export default withAuth(withRouter(Profile));