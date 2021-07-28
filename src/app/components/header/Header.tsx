/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackIcon } from '../../static/img/arrow_back.svg';
import { ReactComponent as LogoBlack } from '../../static/img/logo_black.svg';
import { ReactComponent as FlagUSA } from '../../static/img/flag_usa.svg';
import { ReactComponent as FlagBolivia } from '../../static/img/flag_bolivia.svg';
import styles from './Header.module.css';
import i18n from '../../i18n/instance';

interface HeaderItemProps {
  content: string;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => (
  <span className={styles.headerItem}>{props.content}</span>
);

interface HeaderProps {
  onLanguageChange: () => void;
  onLogoClick: () => void;
  onBackButtonClick: () => void;
  showMenuOnMobile: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { t } = useTranslation();

  const getMessageDependingOnCurrentTime = () => {
    const currentTime = new Date().getHours();

    return currentTime > 6 && currentTime < 19
      ? 'Header.DAY_MESSAGE'
      : 'Header.NIGHT_MESSAGE';
  };

  return (
    <header
      className={`${!props.showMenuOnMobile ? styles.hiddenMenu : ''} ${
        styles.header
      }`}
    >
      <button
        title="Back"
        type="button"
        className={styles.backButton}
        onClick={props.onBackButtonClick}
      >
        <BackIcon />
      </button>
      <span
        role="img"
        aria-label={t(`${getMessageDependingOnCurrentTime()}_ARIA_LABEL`)}
        className={styles.message}
      >
        {t(getMessageDependingOnCurrentTime())}
      </span>
      <button
        title="home"
        type="button"
        className={styles.logo}
        onClick={props.onLogoClick}
      >
        <LogoBlack />
      </button>
      <div className={styles.headerItems}>
        <HeaderItem content={t('Header.HISTORY')} />
        <HeaderItem content={t('Header.HOW_TO_INSTALL')} />
        <HeaderItem content={t('Header.CONTACT')} />
        <button
          title="language-selector"
          type="button"
          onClick={props.onLanguageChange}
          className={styles.languageSelector}
        >
          {i18n.language.match(/en/i) ? <FlagBolivia /> : <FlagUSA />}
        </button>
      </div>
    </header>
  );
};
export default Header;
