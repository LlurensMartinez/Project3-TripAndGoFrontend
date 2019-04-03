import React, { Component } from 'react';
import FormEditTrip from '../components/FormEditTrip';
import tripService from '../lib/trip-services';


class TripsEdit extends Component {

  state = {
    isLoading: true,
    data: {}

  }

  componentDidMount = () => {
    this.getTrip();
  }

  getTrip = () => {
    const { id } = this.props.match.params;
    tripService.getOne(id)
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
          <div className="image-background-formcreate">
          <div>
            <FormEditTrip trip={data} history={this.props.history}/>
          </div>
          </div>
        );
      default:
          break;
    }
  }
}

export default TripsEdit;