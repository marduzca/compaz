import React from 'react';
import install from '../../../static/gif/install.gif';

const Instructions: React.FC = () => (
  <section aria-labelledby="instructions">
    <h2 id="instructions">Instructions</h2>
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
    <div>
      <img src={install} alt="Animation showing installations process" />
      <ol>
        <li>Click on Install icon</li>
        <li>Confirm by clicking on Install</li>
      </ol>
    </div>
  </section>
);

export default Instructions;
