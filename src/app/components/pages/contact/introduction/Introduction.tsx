import React from 'react';
import { useTranslation } from 'react-i18next';
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis odio
          sollicitudin, tempus metus at, efficitur nibh. Ut ultricies tempus
          felis. Phasellus diam erat, ultrices quis purus eget, dictum porttitor
          est. Vivamus non aliquet est. In tristique placerat tincidunt.
        </p>
        <p>
          Integer non rutrum purus. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Suspendisse risus
          tortor, vulputate nec turpis quis, facilisis volutpat erat. Praesent
          sed ligula facilisis, auctor lacus nec, pellentesque justo. Mauris nec
          ullamcorper odio, sit amet mattis ante.
        </p>
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
