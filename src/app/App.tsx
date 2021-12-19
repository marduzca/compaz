import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
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

  const initialHeight = window.outerHeight;

  const adjustViewportHeight = () => {
    const metaViewport = document.querySelector('meta[name=viewport]');

    if (metaViewport) {
      metaViewport.setAttribute(
        'content',
        `height=${initialHeight}, width=device-width, initial-scale=1`
      );
    }
  };

  const debouncedEventHandler = useMemo(
    () => debounce(adjustViewportHeight, 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedEventHandler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
