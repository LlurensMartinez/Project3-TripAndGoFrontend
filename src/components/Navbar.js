import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar'>
        <div className="text-align-center">
          <Link to='/trips' className="text-decoration-none color-black">
            <img src="/images/search.png" alt="search" className="size-5vh"></img>
            <p>Explorar</p>
          </Link>
        </div>
        <div className="text-align-center">
          <Link to='/favs' className="text-decoration-none color-black">
          <img src="/images/like.png" alt="like" className="size-5vh"></img>
          <p>Guardados</p>
          </Link>
        </div>
        <div className="text-align-center">
          <Link to='/trips/new' className="text-decoration-none color-black">
          <img src="/images/world.png" alt="world" className="size-5vh"></img>
          <p>Crear viaje</p>
          </Link>
        </div>
        <div className="text-align-center">
          <Link to='/mytrips' className="text-decoration-none color-black">
          <img src="/images/airplane.png" alt="airplane" className="size-5vh"></img>
          <p>Mis viajes</p>
          </Link>
        </div>
        <div className="text-align-center">
          <Link to='/profile/me' className="text-decoration-none color-black">
          <img src="/images/user.png" alt="user" className="size-5vh"></img>
          <p>Perfil</p>
          </Link>
        </div>
      </nav>
    )
  }
}

export default withAuth(Navbar);