import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormCreateTrip from '../components/FormCreateTrip'
import Navbar from '../components/Navbar';

class TripsCreate extends Component {
  render() {
    return (
      <div className="image-background-formcreate">
      <div>
        <div className="nav-top">
          <div>
          </div>
        </div>
        <FormCreateTrip history={this.props} />
        <Navbar />
      </div>
      </div>
    );
  }
}

export default withRouter(TripsCreate);