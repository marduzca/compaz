import React from 'react';
import { actions } from '@storybook/addon-actions';
import ContactForm from './ContactForm';

export default {
  component: ContactForm,
  title: 'Contact / ContactForm',
};

export const normalState: React.FC = () => (
  <ContactForm
    name=""
    email=""
    message=""
    onSubmit={actions('onSubmit').onSubmit}
    onNameChange={actions('onNameChange').onNameChange}
    onEmailChange={actions('onEmailChange').onEmailChange}
    onMessageChange={actions('onMessageChange').onMessageChange}
  />
);
