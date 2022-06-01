import React from 'react';
import { ReactComponent as BulletPoint } from '../../static/svg/bullet.svg';
import devices from '../../static/img/devices.png';
import styles from './HowToInstall.module.css';
import MobileHeader from '../molecules/mobileHeader/MobileHeader';
import Instructions from './instructions/Instructions';

interface HowToInstallProps {
  onMenuButtonClick: () => void;
}

const HowToInstall: React.FC<HowToInstallProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader
      onMenuButtonClick={props.onMenuButtonClick}
      hasLightBackground
    />
    <div className={styles.content}>
      <h1>How to install</h1>
      <section className={styles.benefits}>
        <ul>
          <li>
            <BulletPoint aria-hidden />
            <span>Runs in any device</span>
          </li>
          <li>
            <BulletPoint aria-hidden />
            <span>Look and feel of a native app</span>
          </li>
          <li>
            <BulletPoint aria-hidden />
            <span>Works even if you are offline!</span>
          </li>
        </ul>
        <img
          src={devices}
          alt="Laptop, table and mobile running compaz app"
          loading="lazy"
        />
      </section>
      <Instructions />
    </div>
  </main>
);

export default HowToInstall;
