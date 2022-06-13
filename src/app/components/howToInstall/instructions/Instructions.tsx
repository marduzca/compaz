import React from 'react';
import styles from './Instructions.module.css';
import install from '../../../static/gif/install.gif';

const Instructions: React.FC = () => (
  <section className={styles.container} aria-labelledby="instructions">
    <h2 id="instructions">Instructions</h2>
    <div className={styles.content}>
      <header className={styles.selectors}>
        <label>
          <span>Device</span>
          <select>
            <option>Smartphone / Tablet</option>
            <option>Laptop</option>
          </select>
        </label>
        <label>
          <span>Browser</span>
          <select id="device">
            <option>Google Chrome</option>
            <option>Mozilla Firefox</option>
            <option>Safari</option>
          </select>
        </label>
      </header>
      <div className={styles.steps}>
        {!localStorage.getItem('replaceGifForVisualRegressionTest') && (
          <img src={install} alt="Animation showing installations process" />
        )}
        <ol>
          <li>
            Go to compaz.com and click the Install icon on the address bar.
          </li>
          <li>In the newly opened window, confirm by clicking `Install`</li>
          <li>
            The compaz icon is now visible in your desktop as an installed app.
            Click the icon to open it.
          </li>
          <li>
            You can now see compaz running with the look-and-feel of a native
            app and enjoy all the benefits that come with it!
          </li>
        </ol>
      </div>
    </div>
  </section>
);

Instructions.defaultProps = {
  forVisualRegressionTest: false,
};

export default Instructions;
