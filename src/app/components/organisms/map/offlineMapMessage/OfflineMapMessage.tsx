import React from 'react';
import { useTranslation } from 'react-i18next';
import OfflineMap from '../../../../static/svg/offline_map.svg?react';
import styles from './OfflineMapMessage.module.css';

const OfflineMapMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div role="alert" aria-live="off" className={styles.container}>
      <OfflineMap aria-hidden />
      <p>{t('Map.OFFLINE_MAP')}</p>
    </div>
  );
};

export default OfflineMapMessage;
