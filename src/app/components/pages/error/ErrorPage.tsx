import React from 'react';
import { useTranslation } from 'react-i18next';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';
import styles from './ErrorPage.module.css';
import spaceLlama from '../../../static/img/space_llama.png';

interface ErrorPageProps {
  onMenuButtonClick: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <MobileHeader
        onMenuButtonClick={props.onMenuButtonClick}
        hasLightBackground
      />
      <section className={styles.content}>
        <img src={spaceLlama} loading="lazy" alt={t('ErrorPage.SPACE_ALT')} />
        <div className={styles.text}>
          <span>{t('ErrorPage.OOPS')}</span>
          <strong>404</strong>
          <h1>{t('ErrorPage.PAGE_NOT_FOUND')}</h1>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;