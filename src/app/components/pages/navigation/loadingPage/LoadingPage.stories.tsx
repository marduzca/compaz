import React from 'react';
import { Meta } from '@storybook/react';
import LoadingPage from './LoadingPage';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../../.storybook/preview';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div
    style={{
      width: '100%',
      height: '800px',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'NavigationPage / LoadingPage',
  component: LoadingPage,
} satisfies Meta;

export const Basic = () => guaranteedSize(<LoadingPage />);
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
