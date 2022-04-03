import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MobileHeader.module.css';
import { ReactComponent as MenuIcon } from '../../../static/img/menu.svg';
import { ReactComponent as LogoWhite } from '../../../static/img/logo_white.svg';

interface MobileHeaderProps {
  onMenuButtonClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <button
        title={t('GO_BACK_BUTTON')}
        type="button"
        className={styles.menuButton}
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
        <LogoWhite />
      </div>
    </div>
  );
};

export default MobileHeader;
