import React from 'react';
import styles from './App.module.css';
import HeaderContainer from './components/header/HeaderContainer';
import FooterContainer from './components/footer/FooterContainer';
import PageContent from './components/content/PageContent';
import { FirebaseProvider } from './components/providers/FirebaseProvider';

export interface Station {
  id: string;
  name: string;
  lines: string[];
}

const App = () => (
  <div className={styles.App}>
    <HeaderContainer />
    <FirebaseProvider>
      <PageContent />
    </FirebaseProvider>
    <FooterContainer />
  </div>
);

export default App;
