import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router';
import LogoBlue from '../../../static/svg/logo_blue.svg?react';
import FlagUSA from '../../../static/svg/flag_usa.svg?react';
import FlagBolivia from '../../../static/svg/flag_bolivia.svg?react';
import CloseIcon from '../../../static/svg/close.svg?react';
import MorningIcon from '../../../static/svg/morning.svg?react';
import AfternoonIcon from '../../../static/svg/afternoon.svg?react';
import NightIcon from '../../../static/svg/night.svg?react';
import HomeIcon from '../../../static/svg/home.svg?react';
import MapIcon from '../../../static/svg/map.svg?react';
import InstallIcon from '../../../static/svg/install.svg?react';
import ContactIcon from '../../../static/svg/contact.svg?react';
import AboutIcon from '../../../static/svg/about.svg?react';
import styles from './Menu.module.css';
import i18n from '../../../i18n/instance';
import useTimeOfTheDay from '../../hooks/useTimeOfTheDay/useTimeOfTheDay';
import MenuLink from './menuLink/MenuLink';

export enum NavigationLink {
  BASE = '/',
  NAVIGATION = '/navigation',
  CONTACT = '/contact',
  ABOUT = '/about',
  MAP = '/map',
  HOW_TO_INSTALL = '/how-to-install',
  ROUTES_OVERVIEW = `/overview`,
  ROUTE_DETAILS = '/details',
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  navigationLink: NavigationLink;
}

const menuItems = [
  {
    name: 'Menu.HOME',
    icon: <HomeIcon />,
    navigationLink: NavigationLink.BASE,
  },
  {
    name: 'Menu.MAP',
    icon: <MapIcon />,
    navigationLink: NavigationLink.MAP,
  },
  {
    name: 'Menu.HOW_TO_INSTALL',
    icon: <InstallIcon />,
    navigationLink: NavigationLink.HOW_TO_INSTALL,
  },
  {
    name: 'Menu.CONTACT',
    icon: <ContactIcon />,
    navigationLink: NavigationLink.CONTACT,
  },
  {
    name: 'Menu.ABOUT',
    icon: <AboutIcon />,
    navigationLink: NavigationLink.ABOUT,
  },
] as MenuItem[];

interface MenuProps {
  onLanguageChange: () => void;
  onHideMobileMenu: () => void;
  showMenuOnMobile: boolean;
  isMobile: boolean;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isMorning, isAfternoon } = useTimeOfTheDay();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState<string>(location.pathname);

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
    setCurrentPage(location.pathname);
  }, [location]);

  useEffect(() => {
    if (props.showMenuOnMobile) {
      document.addEventListener('mousedown', handleClickOutsideOfMobileMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOfMobileMenu);
    };

    // eslint-disable-next-line
  }, [props.showMenuOnMobile]);

  const greetingMessage = useMemo(() => {
    if (isMorning) {
      return (
        <>
          <MorningIcon />
          <span>{t('Menu.MORNING_MESSAGE')}</span>
        </>
      );
    }

    if (isAfternoon) {
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
  }, [isMorning, isAfternoon, t]);

  return (
    <CSSTransition
      nodeRef={mobileMenuRef}
      in={!props.isMobile || props.showMenuOnMobile}
      timeout={750}
      classNames={{
        enter: styles.menuEntered,
        enterActive: styles.menuEntering,
        exit: styles.menuExited,
        exitActive: styles.menuExiting,
      }}
      unmountOnExit
    >
      <header
        ref={mobileMenuRef}
        className={`${styles.header} ${
          !props.showMenuOnMobile ? styles.hiddenMenu : ''
        }`}
      >
        <button
          title={t('Menu.CLOSE_BUTTON')}
          type="button"
          className={styles.backButton}
          onClick={props.onHideMobileMenu}
          autoFocus
        >
          <CloseIcon />
        </button>
        <section className={styles.message}>{greetingMessage}</section>
        <nav className={styles.navBar}>
          <a
            href={NavigationLink.BASE}
            title={t('Menu.GO_HOME')}
            className={styles.logo}
            aria-current={
              currentPage === NavigationLink.BASE ? 'page' : undefined
            }
          >
            <LogoBlue />
          </a>
          <ul className={styles.headerItems}>
            {menuItems.map((menuItem) => (
              <MenuLink
                key={menuItem.name}
                name={t(menuItem.name)}
                icon={menuItem.icon}
                href={menuItem.navigationLink}
                onLinkClick={(href: string) => {
                  setCurrentPage(href);
                  props.onHideMobileMenu();
                }}
                isCurrentPage={currentPage === menuItem.navigationLink}
              />
            ))}
            <li className={styles.languageSelector}>
              <span>{t('Menu.LANGUAGE')}</span>
              <button
                title={t('Menu.CHANGE_LANGUAGE')}
                aria-label={t('Menu.CHANGE_LANGUAGE')}
                type="button"
                onClick={props.onLanguageChange}
              >
                {i18n.language.match(/en/i) ? <FlagBolivia /> : <FlagUSA />}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </CSSTransition>
  );
};

export default Menu;
