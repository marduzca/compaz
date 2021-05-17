import React from 'react';
import Header from './Header';
import i18n from '../../i18n/instance';

const HeaderContainer: React.FC = () => {
  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  return <Header onLanguageChange={handleLanguageChange} />;
};

export default HeaderContainer;
