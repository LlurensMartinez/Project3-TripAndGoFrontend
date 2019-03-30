import React, {Component} from 'react';
import firebase from 'firebase';



class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      uploadValue: 0,
      picture: null,
      fileName: ""
    }
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);
    console.log(storageRef)

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(percentage)
      this.setState({
        uploadValue: percentage,
        fileName: task.uploadUrl_
      })
    }, error => {
      console.log(error.message)
    }, () => {
      this.setState({
        uploadValue: 100,
        picture: task.snapshot.downloadURL,
        
      });
      this.props.getImageURL(this.state.fileName);
    });

  }
  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100"></progress>
        <br/>
        <input type="file" onChange={this.handleUpload}></input>
        <br></br>
        <img width="320" src="this.state.picture" alt="" />
      </div>
    );
  }
}

export default FileUpload;