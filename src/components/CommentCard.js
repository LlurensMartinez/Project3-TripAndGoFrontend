import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import commentService from '../lib/comment-service';
import { withAuth } from '../providers/AuthProvider';


class CommentCard extends Component {

    state = {
        text: ""
        
    }

    //Componentdidmount
    componentDidMount() {
    

    }

    // Entra aqui al presionar crear viaje en el formulario
  handleFormSubmit = (event) => {
    event.preventDefault();
    
    const { text } = this.state;
    
    // se envian los datos introducidos a tripService
    commentService.create(this.props.trip._id, { text })
      .then((data) => {
       
      })
      .catch((data) => {
        this.setState({
          error: data.response.data.error
        })
      })
    }

     //funcion que registra todo lo que intriducimos en los campos input y lo introduce el el campo que corresponda del state
    handleChange = (event) => {
     const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { data, user } = this.props;
        const { text } = this.state;

        return (
            <div className="tripscard-margin-top">
                <form className="formcreatetrip-margin-top" onSubmit={this.handleFormSubmit}>
            <div className="formcreate-padding-top formcreatetrip-margin-top">
              <textarea placeholder="comentario" name="text" value={text} onChange={this.handleChange} className="font-family-roboto formcreatetrip-text-area">
              </textarea>
            </div>
            <footer className="formcreatetrip-text-align-center">
              <input className="formcreatetrip-button" type="submit" value="Comentar" />
            </footer>
          </form>
            </div>
        );
    }
}

export default withAuth(CommentCard);