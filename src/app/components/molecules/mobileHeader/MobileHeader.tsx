import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MobileHeader.module.css';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';
import { ReactComponent as LogoBlack } from '../../../static/img/logo_black.svg';

interface MobileHeaderProps {
  onMenuButtonClick: () => void;
  hasLightBackground: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <button
        title={t('GO_BACK_BUTTON')}
        type="button"
        className={`${styles.menuButton} ${
          props.hasLightBackground && styles.darkMenuButton
        }`}
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
          props.onMenuButtonClick();
        }}
        aria-expanded={isMobileMenuOpen}
        aria-haspopup
      >
        <MenuIcon />
      </button>
      <div className={styles.logo}>
        {props.hasLightBackground ? <LogoBlack /> : <LogoWhite />}
      </div>
    </header>
  );
};

export default MobileHeader;
