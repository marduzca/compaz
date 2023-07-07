import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import ContactPage from './ContactPage';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div style={{ height: '750px' }}>{child}</div>
);

export default {
  component: ContactPage,
  title: 'ContactPage',
} as Meta;

export const NormalAndMobileState: React.FC = () =>
  guaranteedSize(
    <ContactPage
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    />,
  );
