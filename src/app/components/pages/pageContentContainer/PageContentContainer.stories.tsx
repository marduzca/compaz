import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import PageContentContainer from './PageContentContainer';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../.storybook/preview';

export default {
  component: PageContentContainer,
  title: 'PageContentContainer',
} satisfies Meta;

export const Basic = () => (
  <PageContentContainer
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  >
    <p style={{ fontSize: '4rem' }}>
      This is the left column content of the page
    </p>
    <p style={{ fontSize: '4rem' }}>
      This is the right column content of the page
    </p>
  </PageContentContainer>
);
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
