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

const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
  const { t } = useTranslation();

  return (
    <header
      className={`${
        props.hasMenuButtonOnly ? styles.invisibleHeader : styles.header
      } ${!props.isNavigationPage && styles.withoutMapLink}`}
    >
      <ExpandableButton
        accessibleName={t('Menu.OPEN_BUTTON')}
        icon={<MenuIcon />}
        onClick={props.onMenuButtonClick}
        className={`${!props.hasMenuButtonOnly && styles.menuButton} ${
          !props.isNavigationPage && styles.blueMenuButton
        }`}
        isRounded={props.hasMenuButtonOnly}
      />
      <a href="./" title={t('Menu.GO_HOME')} className={styles.logo}>
        {props.isNavigationPage ? <LogoWhite /> : <LogoBlue />}
      </a>
      {props.isNavigationPage && (
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

MobileHeader.defaultProps = {
  hasMenuButtonOnly: false,
  isNavigationPage: false,
};

export default MobileHeader;
