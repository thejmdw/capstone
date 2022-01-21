import React from 'react';
import ReactDOM from 'react-dom';
import { SwipeHome } from "./components/SwipeHome"
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMqQob-dFWlziWhJuOmZEo_zxZJckmY64",
  authDomain: "swipehome-d73a6.firebaseapp.com",
  databaseURL: "https://swipehome-d73a6-default-rtdb.firebaseio.com",
  projectId: "swipehome-d73a6",
  storageBucket: "swipehome-d73a6.appspot.com",
  messagingSenderId: "877328288748",
  appId: "1:877328288748:web:ac065cc9cbd55fa62f4ec9",
  measurementId: "G-HS5NE725R3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SwipeHome />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
