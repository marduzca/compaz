/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoBlack } from '../../static/img/logo_black.svg';
import { ReactComponent as FlagUSA } from '../../static/img/flag_usa.svg';
import { ReactComponent as FlagBolivia } from '../../static/img/flag_bolivia.svg';
import { ReactComponent as BackIcon } from '../../static/img/arrow_back.svg';
import { ReactComponent as MorningIcon } from '../../static/img/morning.svg';
import { ReactComponent as AfternoonIcon } from '../../static/img/afternoon.svg';
import { ReactComponent as NightIcon } from '../../static/img/night.svg';
import { ReactComponent as HistoryIcon } from '../../static/img/history.svg';
import { ReactComponent as InstallIcon } from '../../static/img/install.svg';
import { ReactComponent as ContactIcon } from '../../static/img/contact.svg';
import styles from './Menu.module.css';
import i18n from '../../i18n/instance';

interface HeaderItemProps {
  content: string;
  icon: JSX.Element;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => (
  <li className={styles.headerItem}>
    <span className={styles.headerItemIcon}>{props.icon}</span>
    <span>{props.content}</span>
  </li>
);

interface HeaderProps {
  onLanguageChange: () => void;
  onLogoClick: () => void;
  onHideMobileMenu: () => void;
  showMenuOnMobile: boolean;
  fixNightMessage?: boolean; // Used only to avoid flakyness in the visual regression test
}

const Menu: React.FC<HeaderProps> = (props) => {
  const { t } = useTranslation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideOfMobileMenu = (e: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      mobileMenuRef.current.contains(e.target as Node)
    ) {
      return;
    }

    props.onHideMobileMenu();
  };

  useEffect(() => {
    if (props.showMenuOnMobile) {
      document.addEventListener('mousedown', handleClickOutsideOfMobileMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    };
  }, [props.showMenuOnMobile]);

  const getMessageBasedOnTimeOfTheDay = () => {
    if (props.fixNightMessage) {
      // Used only to avoid flakyness in the visual regression test
      return (
        <>
          <NightIcon />
          <span>{t('Menu.NIGHT_MESSAGE')}</span>
        </>
      );
    }

    const currentTime = new Date().getHours();

    if (currentTime > 6 && currentTime < 13) {
      return (
        <>
          <MorningIcon />
          <span>{t('Menu.MORNING_MESSAGE')}</span>
        </>
      );
    }

    if (currentTime >= 13 && currentTime < 19) {
      return (
        <>
          <AfternoonIcon />
          <span>{t('Menu.AFTERNOON_MESSAGE')}</span>
        </>
      );
    }

    return (
      <>
        <NightIcon />
        <span>{t('Menu.NIGHT_MESSAGE')}</span>
      </>
    );
  };

  return (
    <header
      className={`${styles.header} ${
        !props.showMenuOnMobile ? styles.hiddenMenu : ''
      }`}
      ref={mobileMenuRef}
    >
      <button
        title={t('GO_BACK_BUTTON')}
        type="button"
        className={styles.backButton}
        onClick={props.onHideMobileMenu}
      >
        <BackIcon />
      </button>
      <section className={styles.message}>
        {getMessageBasedOnTimeOfTheDay()}
      </section>
      <button
        title="home"
        type="button"
        className={styles.logo}
        onClick={props.onLogoClick}
      >
        <LogoBlack />
      </button>
      <ul className={styles.headerItems}>
        <HeaderItem content={t('Menu.HISTORY')} icon={<HistoryIcon />} />
        <HeaderItem content={t('Menu.HOW_TO_INSTALL')} icon={<InstallIcon />} />
        <HeaderItem content={t('Menu.CONTACT')} icon={<ContactIcon />} />
        <li className={styles.languageSelector}>
          <span>{t('Menu.LANGUAGE')}</span>
          <button
            title={t('Menu.CHANGE_LANGUAGE')}
            type="button"
            onClick={props.onLanguageChange}
          >
            {i18n.language.match(/en/i) ? <FlagBolivia /> : <FlagUSA />}
          </button>
        </li>
      </ul>
    </header>
  );
};

Menu.defaultProps = {
  fixNightMessage: false,
};

export default Menu;