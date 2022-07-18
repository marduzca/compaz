import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  content: string;
  icon: React.ReactNode;
  href: string;
  isCurrentPage: boolean;
  onLinkClick: (href: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <li className={styles.headerLink}>
    <Link
      to={props.href}
      className={`${styles.headerItem} ${
        props.isCurrentPage && styles.currentPage
      }`}
      onClick={() => props.onLinkClick(props.href)}
      aria-current={props.isCurrentPage ? 'page' : undefined}
    >
      <span className={styles.headerItemIcon}>{props.icon}</span>
      <span>{props.content}</span>
    </Link>
  </li>
);

export default MenuItem;
