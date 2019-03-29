import React, { Component } from 'react';
import FormEditProfile from '../components/FormEditProfile';
import profileService from '../lib/profile-service';
import { withRouter } from 'react-router-dom';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    data: {}

  }
  
  componentDidMount = () => {
    this.getProfile();
  }

  getProfile= () => {
    profileService.getProfile()
      .then(data => {
        this.setState({
          data: data,
          isLoading: false
        })
      })
  }

  render() {
    
    const { data,isLoading } = this.state;

    switch (isLoading) {
      case true:
        return 'loading...';
      case false:
        return (
          <div>
            <h1>Profile Edit</h1>
            <FormEditProfile profile={data} history={this.props.history}/>
          </div>
        );
      default:
          break;
    }
  }
}

export default withRouter(ProfileEdit);