import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import profileService from '../lib/profile-service';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Profile extends Component {

  state = {
    data: {}

  }
  componentDidMount() {
    const { id } = this.props.match.params
    profileService.getProfile(id)
      .then(data => {
        this.setState({
          data: data
        })
        this.checkIntro();
      })
  }

  checkIntro = () =>{
    // Formating comments, to replace \b by <br>
    let comments = document.querySelectorAll('p');
    comments.forEach((comment) => {
        let content = comment.innerHTML.replace(/\n/g, '<br>');
        comment.innerHTML = content;
    });
  }

  render() {
    const { _id, name, username, phoneNumber, imageURL, description } = this.state.data;
    const { logout, user } = this.props;

    return (
      <>
        <div className="nav-top">
          <div className="profile-float">
            <p onClick={this.props.history.goBack}>
              <img src="/images/right-arrow.png" alt="arrow-left" className="size-5vh arrow-back" />
            </p>
            {_id === this.props.user._id && <>  <Link to={`/profile/${user._id}/edit`}>
              <img src="/images/pencil-edit-button.png" alt="profile-edit" className="size-5vh arrow-back" />
            </Link> </>}
          </div>
        </div>
        <div className="profile-margin-global">
          <img className="profile-size-image" src={imageURL} alt="" />
          <h1 className="profile-name-user">{name}</h1>
          <h3 className="profile-titulos" >DIRECCIÓN DE CORREO ELECTRÓNICO</h3>
          <h3 className="profile-username">{username}</h3>
          <div className="profile-margin-top2">
            <h3 className="profile-titulos">NÚMERO DE TELÉFONO</h3>
            <h3 className="profile-username">{phoneNumber}</h3>
          </div>
          <div className="profile-margin-top2">
            <h3 className="profile-titulos">DESCRIPCION</h3>
            <p className="profile-username">{description}</p>
          </div>
          <div className="profile-close-session-div">
            {_id === this.props.user._id && <> <p onClick={logout}>Cerrar sesión</p> </>
            }
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(withRouter(Profile));