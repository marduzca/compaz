import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import MenuContainer from './components/organisms/menu/MenuContainer';
import NavigationPage from './components/pages/navigation/NavigationPage';
import NotificationContainer from './components/organisms/notification/NotificationContainer';
import { FirebaseProvider } from './components/providers/firebase/FirebaseProvider';
import { NavigationProvider } from './components/providers/navigation/NavigationProvider';
import ContactPage from './components/pages/contact/ContactPage';
import HowToInstallPage from './components/pages/howToInstall/HowToInstallPage';
import { NavigationLink } from './components/organisms/menu/Menu';
import AboutPage from './components/pages/about/AboutPage';
import ErrorPage from './components/pages/error/ErrorPage';
import MapPage from './components/pages/map/MapPage';

export const PAGE_TITLE_PREFIX = 'compaz |';

const App = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
      <div className={styles.landscapeMessage}>
        <ErrorPage landscapeError />
      </div>
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
                  <NavigationPage
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
                  <NavigationPage
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
                <MapPage
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path={NavigationLink.HOW_TO_INSTALL}
              element={
                <HowToInstallPage
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path={NavigationLink.CONTACT}
              element={
                <ContactPage
                  onMenuButtonClick={() => {
                    setShowMobileMenu(true);
                  }}
                />
              }
            />
            <Route
              path={NavigationLink.ABOUT}
              element={
                <AboutPage
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
