import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  render() {
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
      </>
    );
  }
}

export default withRouter(Profile);