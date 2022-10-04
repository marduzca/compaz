import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import MenuContainer from './components/organisms/menu/MenuContainer';
import Navigation from './components/pages/navigation/Navigation';
import SadDogImage from './static/img/sad_dog.jpg';
import NotificationContainer from './components/organisms/notification/NotificationContainer';
import { FirebaseProvider } from './components/providers/firebase/FirebaseProvider';
import { NavigationProvider } from './components/providers/navigation/NavigationProvider';
import Contact from './components/pages/contact/Contact';
import HowToInstall from './components/pages/howToInstall/HowToInstall';
import useMediaQuery from './components/hooks/useMediaQuery';
import { NavigationLink } from './components/organisms/menu/Menu';
import About from './components/pages/about/About';

// This is used to trigger a service worker update whenever we release a new version that gets updated here via the release script. DON'T CHANGE MANUALLY!
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APP_VERSION = '0.17.0';

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
  const navigate = useNavigate();
  const location = useLocation();

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

    if (location.pathname === NavigationLink.BASE)
      navigate(NavigationLink.NAVIGATION);

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
              path={`${NavigationLink.NAVIGATION}/*`}
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
              path={NavigationLink.HOW_TO_INSTALL}
              element={
                <HowToInstall
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path={NavigationLink.CONTACT}
              element={
                <Contact
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path={NavigationLink.ABOUT}
              element={
                <About
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
