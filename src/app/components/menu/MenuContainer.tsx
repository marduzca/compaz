import React from 'react';
import Menu from './Menu';
import i18n from '../../i18n/instance';
import useMediaQuery from '../useMediaQuery';

interface HeaderContainerProps {
  onHideMobileMenu: () => void;
  showMenuOnMobile: boolean;
}

const MenuContainer: React.FC<HeaderContainerProps> = (props) => {
  const isMobile = useMediaQuery();

  const SPANISH = 'es';
  const ENGLISH = 'en';

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language.match(/en/i) ? SPANISH : ENGLISH);
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
