import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  ariaLabel: string;
}

const Loader: React.FC<LoaderProps> = (props) => (
  <span
    role="alert"
    aria-busy
    aria-label={props.ariaLabel}
    className={styles.loader}
  />
);

export default Loader;
