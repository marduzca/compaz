import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './App.module.css';
import MenuContainer from './components/menu/MenuContainer';
import FooterContainer from './components/footer/FooterContainer';
import PageContent from './components/content/PageContent';
import { FirebaseProvider } from './components/providers/FirebaseProvider';
import SadDogImage from './static/img/sad_dog.jpg';
import { NavigationProvider } from './components/providers/NavigationProvider';
import NotificationContainer from './components/notification/NotificationContainer';

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
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
      <LandscapeErrorMessage />
      <div className={styles.App}>
        <MenuContainer
          showMenuOnMobile={showMobileMenu}
          onHideMobileMenu={() => {
            setShowMobileMenu(false);
          }}
        />
        <FirebaseProvider>
          <NavigationProvider>
            <PageContent
              onMenuButtonClick={() => {
                setShowMobileMenu(true);
              }}
            />
          </NavigationProvider>
        </FirebaseProvider>
        <FooterContainer />
        <NotificationContainer />
      </div>
    </>
  );
};

export default App;
