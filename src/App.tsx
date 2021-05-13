import React from 'react';
import { throws } from 'assert';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

firebase.initializeApp({
  apiKey: 'AIzaSyCOp-cYAUCxncqLQAcWCCNzD5Wj6NOTDTc',
  authDomain: 'compaz-4.firebaseapp.com',
  projectId: 'compaz-4',
  storageBucket: 'compaz-4.appspot.com',
  messagingSenderId: '650973362685',
  appId: '1:650973362685:web:5f5ea20f88b0788c5c8194',
  measurementId: 'G-BG76THH0ZB',
});

const firestore = firebase.firestore();

firestore
  .enablePersistence({ synchronizeTabs: true })
  .catch((err) => throws(err));

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>This is the placeholder for compaz</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

export default App;
