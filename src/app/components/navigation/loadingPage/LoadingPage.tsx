import React from 'react';
import { useTranslation } from 'react-i18next';
import telefericoIcon from '../../../static/img/teleferico_loading.svg';
import styles from './LoadingPage.module.css';

const LoadingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.line}>
          <img
            className={styles.telefericoIcon}
            src={telefericoIcon}
            alt={t('LOADING')}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
