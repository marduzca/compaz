import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MobileHeader.module.css';
import { ReactComponent as MenuIcon } from '../../../static/svg/menu.svg';
import { ReactComponent as LogoWhite } from '../../../static/svg/logo_white.svg';
import { ReactComponent as LogoBlue } from '../../../static/svg/logo_blue.svg';
import ExpandableButton from '../../atoms/expandableButton/ExpandableButton';

interface MobileHeaderProps {
  onMenuButtonClick: () => void;
  hasLightBackground?: boolean;
  hasMenuButtonOnly?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
  const { t } = useTranslation();

  return (
    <header
      className={`${
        props.hasMenuButtonOnly ? styles.invisibleHeader : styles.header
      }`}
    >
      <ExpandableButton
        accessibleName={t('Menu.OPEN_BUTTON')}
        icon={<MenuIcon />}
        onClick={props.onMenuButtonClick}
        className={`${!props.hasMenuButtonOnly && styles.menuButton} ${
          props.hasLightBackground && styles.blueMenuButton
        }`}
        isRounded={props.hasMenuButtonOnly}
      />
      <a href="./" title={t('Menu.GO_HOME')} className={styles.logo}>
        {props.hasLightBackground ? <LogoBlue /> : <LogoWhite />}
      </a>
    </header>
  );
};

MobileHeader.defaultProps = {
  hasMenuButtonOnly: false,
  hasLightBackground: false,
};

export default MobileHeader;
