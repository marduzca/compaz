import React, { useState } from 'react';
import styles from './App.module.css';
import HeaderContainer from './components/header/HeaderContainer';
import FooterContainer from './components/footer/FooterContainer';
import PageContent from './components/content/PageContent';
import { FirebaseProvider } from './components/providers/FirebaseProvider';

const App = () => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState<boolean>(false);

  return (
    <div className={styles.App}>
      <HeaderContainer
        showMenuOnMobile={showMenuOnMobile}
        onBackButtonClick={() => {
          setShowMenuOnMobile(false);
        }}
      />
      <FirebaseProvider>
        <PageContent
          onMenuButtonClick={() => {
            setShowMenuOnMobile(true);
          }}
        />
      </FirebaseProvider>
      <FooterContainer />
    </div>
  );
};

export default App;
