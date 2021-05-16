import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoBlack } from '../../static/img/logo_black.svg';
import styles from './Header.module.css';

interface HeaderItemProps {
  content: string;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => (
  <span className={styles.menuItem}>{props.content}</span>
);
const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <LogoBlack />
      </div>
      <HeaderItem content="DROPDOWN" />
      <HeaderItem content={t('Header.HISTORY')} />
      <HeaderItem content={t('Header.HOW_TO_INSTALL')} />
      <HeaderItem content={t('Header.CONTACT')} />
      <HeaderItem content={t('Header.ABOUT_US')} />
    </header>
  );
};
export default Header;
