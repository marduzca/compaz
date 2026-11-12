import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineColor } from '../../domain';
import styles from './LineBadge.module.css';

export type LineBadgeSize = 'header' | 'row';
export type LineBadgeVariant = 'cabin' | 'bar';

interface LineBadgeProps {
  line: LineColor;
  size?: LineBadgeSize;
  variant?: LineBadgeVariant;
}

const CabinIcon: React.FC = () => (
  <svg
    className={styles.icon}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path className={styles.hanger} d="M12 1v5" />
    <rect className={styles.body} x="3" y="6" width="18" height="16" rx="5" />
    <rect className={styles.window} x="7" y="10" width="10" height="5" rx="2" />
  </svg>
);

const LineBadge: React.FC<LineBadgeProps> = ({
  line,
  size = 'row',
  variant = 'cabin',
}) => {
  const { t } = useTranslation();

  return (
    <span
      className={`${styles.badge} ${styles[size]} ${styles[variant]}`}
      style={
        { '--line-color': `var(--teleferico-${line})` } as React.CSSProperties
      }
    >
      {variant === 'cabin' ? (
        <CabinIcon />
      ) : (
        <span className={styles.bar} aria-hidden="true" />
      )}
      <span className={styles.name}>
        {t(`Navigation.Route.Lines.${line.toUpperCase()}`)}
      </span>
    </span>
  );
};

export default LineBadge;
