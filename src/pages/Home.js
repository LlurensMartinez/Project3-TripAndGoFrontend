import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Home extends Component {
  render() {
    const { isLogged } = this.props;
    // const { username } = user;
    if (isLogged) {
      return <div>
        
       
      </div>
    } else {
      return (
        <div class="home-container">
          <img src="/images/tripandgo-logo.png" className="home-logo" alt="logo"></img>
          <p>lLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt nulla vel euismod interdum. 
            Vestibulum gravida
          </p>
          <Link to='/login' className="home-btn-login">Login</Link>
          <div className="home-btn-signup">
            <p>¿No tienes una cuenta?</p><Link to='/signup'>¡Registrate!</Link>
          </div>
          
        </div>)
    }
  }
}

export default withAuth(Home);