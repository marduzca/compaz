import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import MenuContainer from './components/menu/MenuContainer';
import Navigation from './components/navigation/Navigation';
import SadDogImage from './static/img/sad_dog.jpg';
import NotificationContainer from './components/notification/NotificationContainer';
import { FirebaseProvider } from './components/providers/firebase/FirebaseProvider';
import { NavigationProvider } from './components/providers/navigation/NavigationProvider';
import Contact from './components/contact/Contact';
import HowToInstall from './components/howToInstall/HowToInstall';
import useMediaQuery from './components/useMediaQuery';

export const PAGE_TITLE_PREFIX = 'compaz |';

const LandscapeErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.landscapeMessage}>
      <p>{t('LANDSCAPE_ERROR')}</p>
      <img alt="Sad dog" src={SadDogImage} loading="lazy" />
    </div>
  );
};

const App = () => {
  const isMobile = useMediaQuery();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const initialHeight = window.innerHeight;

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
    () => debounce(adjustViewportHeight, 75),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isMobile) {
      window.addEventListener('resize', (event: Event) => {
        // Only fix height if we are on portrait mode
        if ((event.target as Window).innerHeight > 480) {
          debouncedEventHandler();
        }
      });
    }

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
          <Routes>
            <Route
              path="/"
              element={
                <NavigationProvider>
                  <Navigation
                    onMenuButtonClick={() => {
                      setShowMobileMenu(true);
                    }}
                    isMobileMenuOpen={showMobileMenu}
                  />
                </NavigationProvider>
              }
            />
            <Route
              path="/how-to-install"
              element={
                <HowToInstall
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
          </Routes>
        </FirebaseProvider>
        <NotificationContainer />
      </div>
    </>
  );
};

export default App;
