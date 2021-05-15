import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <p>LOGO</p>
    <p>DROPDOWN</p>
    <p>Historial</p>
    <p>Como instalar</p>
    <p>Contacto</p>
    <p>Quienes somos</p>
  </header>
);
export default Header;
