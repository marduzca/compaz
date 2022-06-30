import React from 'react';
import Menu from './Menu';
import i18n from '../../i18n/instance';
import useMediaQuery from '../useMediaQuery';

interface HeaderContainerProps {
  onHideMobileMenu: () => void;
  showMenuOnMobile: boolean;
}

const SPANISH = 'es';
const ENGLISH = 'en';

const MenuContainer: React.FC<HeaderContainerProps> = (props) => {
  const isMobile = useMediaQuery();

  const handleLanguageChange = () => {
    const newLanguage = i18n.language.match(/en/i) ? SPANISH : ENGLISH;

    i18n.changeLanguage(newLanguage);
    document.documentElement.setAttribute('lang', newLanguage);
  };

  return (
    <Menu
      onLanguageChange={handleLanguageChange}
      onHideMobileMenu={props.onHideMobileMenu}
      showMenuOnMobile={props.showMenuOnMobile}
      isMobile={isMobile}
    />
  );
};

export default MenuContainer;
