import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './App.module.css';
import HeaderContainer from './components/header/HeaderContainer';
import FooterContainer from './components/footer/FooterContainer';
import PageContent from './components/content/PageContent';
import { FirebaseProvider } from './components/providers/FirebaseProvider';
import SadDogImage from './static/img/sad_dog.jpg';

const LandscapeErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.landscapeMessage}>
      <p>{t('LANDSCAPE_ERROR')}</p>
      <img alt="Sad dog" src={SadDogImage} />
    </div>
  );
};

const App = () => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState<boolean>(false);

  return (
    <>
      <LandscapeErrorMessage />
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
    </>
  );
};

export default App;
