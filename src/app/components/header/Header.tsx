import React from 'react';
import { ReactComponent as LogoBlack } from '../../static/img/logo_black.svg';
import styles from './Header.module.css';

interface HeaderItemProps {
  content: string;
}

const HeaderItem: React.FC<HeaderItemProps> = (props) => (
  <div className={styles.menuItem}>{props.content}</div>
);
const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <LogoBlack />
    </div>
    <HeaderItem content="DROPDOWN" />
    <HeaderItem content="Historial" />
    <HeaderItem content="Como instalar" />
    <HeaderItem content="Contacto" />
    <HeaderItem content="Quienes somos" />
  </header>
);
export default Header;
