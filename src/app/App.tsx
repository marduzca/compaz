import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import MenuContainer from './components/organisms/menu/MenuContainer';
import Navigation from './components/pages/navigation/Navigation';
import SadDogImage from './static/img/sad_dog.jpg';
import NotificationContainer from './components/organisms/notification/NotificationContainer';
import { FirebaseProvider } from './components/providers/firebase/FirebaseProvider';
import { NavigationProvider } from './components/providers/navigation/NavigationProvider';
import Contact from './components/pages/contact/Contact';
import HowToInstall from './components/pages/howToInstall/HowToInstall';
import { NavigationLink } from './components/organisms/menu/Menu';
import About from './components/pages/about/About';
import ErrorPage from './components/pages/error/ErrorPage';
import MapPageContainer from './components/pages/map/MapPageContainer';

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
          <Routes>
            <Route
              path={`${NavigationLink.BASE}/*`}
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
              path={NavigationLink.MAP}
              element={
                <MapPageContainer
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
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
            <Route
              path="/*"
              element={
                <ErrorPage
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
