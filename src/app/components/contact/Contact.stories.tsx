import React from 'react';
import { Meta } from '@storybook/react';
import Contact from './Contact';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div style={{ height: '750px' }}>{child}</div>
);

export default {
  component: Contact,
  title: 'Contact',
} as Meta;

export const normalAndMobileState: React.FC = () => guaranteedSize(<Contact />);