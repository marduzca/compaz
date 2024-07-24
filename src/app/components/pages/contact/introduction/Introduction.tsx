import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import sketch from '../../../../static/img/sketch.png';
import LinkedinIcon from '../../../../static/svg/linkedin.svg?react';
import InstagramIcon from '../../../../static/svg/instagram.svg?react';
import FacebookIcon from '../../../../static/svg/facebook.svg?react';
import styles from './Introduction.module.css';

const Introduction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.sketchWrapper}>
        <img
          className={styles.sketch}
          src={sketch}
          alt={t('Contact.SKETCH_ALT')}
          loading="lazy"
        />
      </div>
      <div className={styles.text}>
        <p>
          <Trans i18nKey="Contact.Introduction.PARAGRAPH_1">
            Contact.Introduction.PARAGRAPH_1
            <span className={styles.compaz} />
          </Trans>
        </p>
        <p>
          <Trans i18nKey="Contact.Introduction.PARAGRAPH_2">
            Contact.Introduction.PARAGRAPH_2
            <span className={styles.compaz} />
          </Trans>
        </p>
        <p>{t('Contact.Introduction.PARAGRAPH_3')}</p>
      </div>
      <div className={styles.socialNetworks}>
        <a
          href="https://www.linkedin.com/in/miguelarduz/"
          title={t('Contact.LINKEDIN_LINK')}
          aria-label={t('Contact.LINKEDIN_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://www.instagram.com/compaz.app/"
          title={t('Contact.INSTAGRAM_LINK')}
          aria-label={t('Contact.INSTAGRAM_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.facebook.com/compaz.application/"
          title={t('Contact.FACEBOOK_LINK')}
          aria-label={t('Contact.FACEBOOK_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon />
        </a>
      </div>
    </section>
  );
};

export default Introduction;
