import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  ariaLabel: string;
}

const Loader: React.FC<LoaderProps> = (props) => (
  <span aria-label={props.ariaLabel} className={styles.loader} />
);

export default Loader;
