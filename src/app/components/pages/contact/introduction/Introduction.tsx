import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import sketch from '../../../../static/img/sketch.png';
import { ReactComponent as GithubIcon } from '../../../../static/svg/github.svg';
import { ReactComponent as LinkedinIcon } from '../../../../static/svg/linkedin.svg';
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
          href="https://github.com/marduzca"
          aria-label={t('Contact.GITHUB_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/miguelarduz/"
          aria-label={t('Contact.LINKEDIN_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon />
        </a>
      </div>
    </section>
  );
};

export default Introduction;
