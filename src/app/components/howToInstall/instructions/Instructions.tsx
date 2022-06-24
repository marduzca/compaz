import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Instructions.module.css';
import install from '../../../static/gif/install.gif';

const Instructions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container} aria-labelledby="instructions">
      <h2 id="instructions">{t('HowToInstall.Instructions.HEADING')}</h2>
      <div className={styles.content}>
        <header className={styles.selectors}>
          <label>
            <span>{t('HowToInstall.Instructions.DEVICE_SELECTOR_LABEL')}</span>
            <select>
              <option>
                {t('HowToInstall.Instructions.SMARTPHONE_TABLET_OPTION')}
              </option>
              <option>{t('HowToInstall.Instructions.LAPTOP_OPTION')}</option>
            </select>
          </label>
          <label>
            <span>{t('HowToInstall.Instructions.BROWSER_SELECTOR_LABEL')}</span>
            <select id="device">
              <option>Google Chrome</option>
              <option>Mozilla Firefox</option>
              <option>Safari</option>
            </select>
          </label>
        </header>
        <div className={styles.steps}>
          {!localStorage.getItem('replaceGifForVisualRegressionTest') ? (
            <img
              src={install}
              alt={t('HowToInstall.Instructions.INSTALLATION_GIF_ALT', {
                device: t('HowToInstall.Instructions.LAPTOP_OPTION'),
                browser: 'Google Chrome',
              })}
              className={styles.installationGif}
            />
          ) : (
            <div
              role="img"
              aria-label="FAKE GIF"
              className={`${styles.installationGif} ${styles.fakeGif}`}
            >
              FAKE GIF
            </div>
          )}
          <ol>
            <li>{t('HowToInstall.Instructions.STEP_1_LAPTOP')}</li>
            <li>{t('HowToInstall.Instructions.STEP_2_LAPTOP')}</li>
            <li>{t('HowToInstall.Instructions.STEP_3')}</li>
            <li>{t('HowToInstall.Instructions.STEP_4')}</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
