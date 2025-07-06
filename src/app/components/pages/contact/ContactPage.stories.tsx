import React from 'react';
import { Meta } from '@storybook/react-vite';
import { actions } from 'storybook/actions';
import ContactPage from './ContactPage';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../.storybook/preview';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div style={{ height: '750px' }}>{child}</div>
);

export default {
  component: ContactPage,
  title: 'ContactPage',
} satisfies Meta;

export const Basic = () =>
  guaranteedSize(
    <ContactPage
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    />,
  );
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
