import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import PageContentContainer from './PageContentContainer';

export default {
  component: PageContentContainer,
  title: 'PageContentContainer',
} as Meta;

export const NormalAndMobileState = () => (
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
