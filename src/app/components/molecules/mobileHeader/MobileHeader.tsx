import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './MobileHeader.module.css';
import MenuIcon from '../../../static/svg/menu.svg?react';
import LogoWhite from '../../../static/svg/logo_white.svg?react';
import MapLinkIconEnglish from '../../../static/svg/map_link_en.svg?react';
import MapLinkIconSpanish from '../../../static/svg/map_link_es.svg?react';

import LogoBlue from '../../../static/svg/logo_blue.svg?react';
import ExpandableButton from '../../atoms/expandableButton/ExpandableButton';
import { NavigationLink } from '../../organisms/menu/Menu';
import i18n from '../../../i18n/instance';

interface MobileHeaderProps {
  onMenuButtonClick: () => void;
  isNavigationPage?: boolean;
  hasMenuButtonOnly?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  hasMenuButtonOnly = false,
  isNavigationPage = false,
  onMenuButtonClick,
}) => {
  const { t } = useTranslation();

  return (
    <header
      className={`${
        hasMenuButtonOnly ? styles.invisibleHeader : styles.header
      } ${!isNavigationPage && styles.withoutMapLink}`}
    >
      <ExpandableButton
        accessibleName={t('Menu.OPEN_BUTTON')}
        icon={<MenuIcon />}
        onClick={onMenuButtonClick}
        className={`${!hasMenuButtonOnly && styles.menuButton} ${
          !isNavigationPage && styles.blueMenuButton
        }`}
        isRounded={hasMenuButtonOnly}
      />
      <a href="./" title={t('Menu.GO_HOME')} className={styles.logo}>
        {isNavigationPage ? <LogoWhite /> : <LogoBlue />}
      </a>
      {isNavigationPage && (
        <Link
          to={NavigationLink.MAP}
          className={styles.mapLink}
          title={t('Map.GO_TO_MAP')}
        >
          {i18n.language.match(/en/i) ? (
            <MapLinkIconEnglish />
          ) : (
            <MapLinkIconSpanish />
          )}
        </Link>
      )}
    </header>
  );
};

export default MobileHeader;
