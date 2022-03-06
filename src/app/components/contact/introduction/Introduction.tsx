import React from 'react';
import sketch from '../../../static/img/sketch.png';
import { ReactComponent as GithubIcon } from '../../../static/img/github.svg';
import { ReactComponent as LinkedinIcon } from '../../../static/img/linkedin.svg';
import styles from './Introduction.module.css';

const Introduction: React.FC = () => (
  <section className={styles.container}>
    <div className={styles.sketchWrapper}>
      <img
        className={styles.sketch}
        src={sketch}
        alt="Sketch of the developer author of compaz"
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
        tortor, vulputate nec turpis quis, facilisis volutpat erat. Praesent sed
        ligula facilisis, auctor lacus nec, pellentesque justo. Mauris nec
        ullamcorper odio, sit amet mattis ante.
      </p>
    </div>
    <div className={styles.socialNetworks}>
      <a
        href="https://github.com/marduzca"
        aria-label="Github account"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/miguelarduz/"
        aria-label="Linkedin account"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedinIcon />
      </a>
    </div>
  </section>
);

export default Introduction;
