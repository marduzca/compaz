import React from 'react';
import devices from '../../static/img/devices.png';
import { ReactComponent as BulletPoint } from '../../static/img/bullet.svg';
import styles from './HowToInstall.module.css';
import MobileHeader from '../molecules/mobileHeader/MobileHeader';

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
      <section>
        <h2>Instructions</h2>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Device</span>
          <select id="device">
            <option>Smartphone / Tablet</option>
            <option>Mobile</option>
          </select>
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <span>Browser</span>
          <select id="device">
            <option>Google Chrome</option>
            <option>Mozilla Firefox</option>
          </select>
        </label>
      </section>
      <div>STEPS</div>
    </div>
  </main>
);

export default HowToInstall;
