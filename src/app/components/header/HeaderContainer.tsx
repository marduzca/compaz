import React from 'react';
import Header from './Header';
import i18n from '../../i18n/instance';

const HeaderContainer: React.FC = () => {
  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const handleLogoClick = () => {
    // redirect to home page with refresh
    window.location.replace('/');
  };

  return (
    <Header
      onLanguageChange={handleLanguageChange}
      onLogoClick={handleLogoClick}
    />
  );
};

export default HeaderContainer;
