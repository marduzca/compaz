import React from 'react';
import { Meta } from '@storybook/react-vite';
import { actions } from 'storybook/actions';
import ExpandableButton from './ExpandableButton';
import MenuIcon from '../../../static/svg/menu.svg?react';

export default {
  component: ExpandableButton,
  title: 'Atoms / ExpandableButton',
} satisfies Meta;

export const RoundedButtonInNormalState: React.FC = () => (
  <div
    style={{
      backgroundColor: '#1976d2',
      maxWidth: 'fit-content',
      maxHeight: 'fit-content',
      padding: '3rem',
    }}
  >
    <ExpandableButton
      onClick={actions('onClick').onClick}
      icon={<MenuIcon />}
      accessibleName="Menu button"
      isRounded
    />
  </div>
);
