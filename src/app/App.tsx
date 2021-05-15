import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styles from './App.module.css';
import HeaderContainer from './components/header/HeaderContainer';
import FooterContainer from './components/footer/FooterContainer';
import PageContent from './components/content/PageContent';

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
  // eslint-disable-next-line no-console
  .catch(() => console.log('Enable persistence failed, do nothing for now'));

const App = () => (
  <div className={styles.App}>
    <HeaderContainer />
    <PageContent />
    <FooterContainer />
  </div>
);

export default App;
