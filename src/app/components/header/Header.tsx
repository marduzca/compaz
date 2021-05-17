/* eslint-disable jsx-a11y/accessible-emoji,jsx-a11y/no-onchange,jsx-a11y/interactive-supports-focus */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoBlack } from '../../static/img/logo_black.svg';
import styles from './Header.module.css';
import i18n from '../../i18n/instance';

interface HeaderItemProps {
  content: string;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => (
  <span className={styles.menuItem}>{props.content}</span>
);

interface HeaderProps {
  onLanguageChange: (newLanguage: string) => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div
        title="logo"
        role="button"
        className={styles.logo}
        onClick={props.onLogoClick}
      >
        <LogoBlack />
      </div>
      <select
        title="language-selector"
        defaultValue={i18n.language}
        className={styles.languageSelector}
        onChange={(e) => {
          props.onLanguageChange(e.target.value);
        }}
      >
        <option value="es">🇧🇴</option>
        <option value="en">🇺🇸</option>
      </select>
      <HeaderItem content={t('Header.HISTORY')} />
      <HeaderItem content={t('Header.HOW_TO_INSTALL')} />
      <HeaderItem content={t('Header.CONTACT')} />
      <HeaderItem content={t('Header.ABOUT_US')} />
    </header>
  );
};
export default Header;
