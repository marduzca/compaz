import React from 'react';
import { ReactComponent as CheckMarkIcon } from '../../static/img/check.svg';
import { ReactComponent as ClockIcon } from '../../static/img/clock.svg';
import { ReactComponent as MapIcon } from '../../static/img/map.svg';
import styles from './Footer.module.css';

interface FooterItemProps {
  text: string;
  icon: JSX.Element;
}

const FooterItem: React.FC<FooterItemProps> = (props) => (
  <div className={styles.footerItem}>
    <div className={styles.footerIcon}>{props.icon}</div>
    <span>{props.text}</span>
  </div>
);
const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <FooterItem text="Tu guía para saber como llegar" icon={<MapIcon />} />
    <FooterItem text="Planea la duración de tu viaje" icon={<ClockIcon />} />
    <FooterItem text="Fácil y al alcance de la mano" icon={<CheckMarkIcon />} />
  </footer>
);

export default Footer;
