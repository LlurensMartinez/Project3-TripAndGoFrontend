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
        <div className="home-background">
          <div className="home-padding-top">
            <div className="text-align-center">
              <img src="/images/logo.png" alt="logo" />
            </div>
            <div className="text-align-center home-line-height">
              <p className="home-montserrat600 home-link-color-white">¿Quieres viajar y no tienes con quién ir?
          </p>
              <p className="home-montserrat800 home-link-color-white">Inicia tu aventura</p>
            </div>
            <div className="home-margin-top">
              <Link to='/login' className="home-newsession-link">INICIAR SESIÓN</Link>
            </div>
            <footer className="home-footer">
              <p>¿No tienes una cuenta?</p>
              <p><Link className="home-link-color-white" to='/signup'>¡Registrate!</Link></p>
            </footer>
          </div>
        </div>
      )
    }
  }
}

export default withAuth(Home);