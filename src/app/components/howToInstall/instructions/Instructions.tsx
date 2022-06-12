import React from 'react';
import styles from './Instructions.module.css';
import install from '../../../static/gif/install.gif';

interface InstructionsProps {
  forVisualRegressionTest?: boolean;
}

const Instructions: React.FC<InstructionsProps> = (props) => (
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
      <div>
        {!props.forVisualRegressionTest && (
          <img src={install} alt="Animation showing installations process" />
        )}
        <ol>
          <li>Click on Install icon</li>
          <li>Confirm by clicking on Install</li>
        </ol>
      </div>
    </div>
  </section>
);

Instructions.defaultProps = {
  forVisualRegressionTest: false,
};

export default Instructions;
