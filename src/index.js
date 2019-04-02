import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import firebase from 'firebase';
import './index.css';


firebase.initializeApp({
  apiKey: "AIzaSyCfuQ70DR94cFTl80h620DfyvRW5tCYnMI",
    authDomain: "tripandgofrontend.firebaseapp.com",
    databaseURL: "https://tripandgofrontend.firebaseio.com",
    projectId: "tripandgofrontend",
    storageBucket: "tripandgofrontend.appspot.com",
    messagingSenderId: "1087449744779"
});


ReactDOM.render(
  <Router>
    <App />
  </Router>
, document.getElementById('root'));