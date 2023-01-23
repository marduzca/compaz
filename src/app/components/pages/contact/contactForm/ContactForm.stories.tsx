import React from 'react';
import { actions } from '@storybook/addon-actions';
import ContactForm from './ContactForm';

export default {
  component: ContactForm,
  title: 'ContactPage / ContactForm',
};

export const NormalState: React.FC = () => (
  <ContactForm
    name=""
    email=""
    message=""
    wasMessageSuccessfullySent={false}
    isMessageSendingInProgress={false}
    onSubmit={actions('onSubmit').onSubmit}
    onNameChange={actions('onNameChange').onNameChange}
    onEmailChange={actions('onEmailChange').onEmailChange}
    onMessageChange={actions('onMessageChange').onMessageChange}
  />
);

export const NormalStateWithLoader: React.FC = () => (
  <ContactForm
    name="Roberto Gomez Bolañoz"
    email="chespirito@chavonet.com"
    message="Fue sin querer queriendo"
    wasMessageSuccessfullySent={false}
    isMessageSendingInProgress
    onSubmit={actions('onSubmit').onSubmit}
    onNameChange={actions('onNameChange').onNameChange}
    onEmailChange={actions('onEmailChange').onEmailChange}
    onMessageChange={actions('onMessageChange').onMessageChange}
  />
);

export const NormalStateWithEmailSent: React.FC = () => (
  <ContactForm
    name=""
    email=""
    message=""
    wasMessageSuccessfullySent
    isMessageSendingInProgress={false}
    onSubmit={actions('onSubmit').onSubmit}
    onNameChange={actions('onNameChange').onNameChange}
    onEmailChange={actions('onEmailChange').onEmailChange}
    onMessageChange={actions('onMessageChange').onMessageChange}
  />
);
