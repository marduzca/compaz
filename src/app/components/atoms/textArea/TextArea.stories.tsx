import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import TextArea from './TextArea';

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div
    style={{
      width: '100%',
      height: '400px',
    }}
  >
    {child}
  </div>
);

export default {
  component: TextArea,
  title: 'Atoms / TextArea',
} satisfies Meta;

export const WithoutInput: React.FC = () =>
  guaranteedSize(
    <TextArea
      value=""
      onChange={actions('onChange').onChange}
      label="Your message"
    />,
  );

export const WithInput: React.FC = () =>
  guaranteedSize(
    <TextArea
      value="Le queria decir que su app es excelente! :D"
      onChange={actions('onChange').onChange}
      label="Your message"
    />,
  );
