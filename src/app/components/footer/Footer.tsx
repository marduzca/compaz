import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CheckMarkIcon } from '../../static/svg/check.svg';
import { ReactComponent as ClockIcon } from '../../static/svg/clock.svg';
import { ReactComponent as MapIcon } from '../../static/svg/map.svg';
import styles from './Footer.module.css';

interface FooterItemProps {
  text: string;
  icon: React.ReactNode;
}

const FooterItem: React.FC<FooterItemProps> = (props) => (
  <div className={styles.footerItem}>
    <div className={styles.footerIcon}>{props.icon}</div>
    <span>{props.text}</span>
  </div>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <FooterItem text={t('Footer.GUIDE')} icon={<MapIcon />} />
      <FooterItem text={t('Footer.TIME')} icon={<ClockIcon />} />
      <FooterItem text={t('Footer.EASY')} icon={<CheckMarkIcon />} />
    </footer>
  );
};

export default Footer;
