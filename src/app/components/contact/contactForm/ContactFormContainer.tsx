import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import {
  DISABLE_MESSAGE_STORAGE_FLAG,
  isFeatureFlagSet,
} from '../../../featureFlag/FeatureFlag';

const ContactFormContainer: React.FC = () => {
  const { storeMessage } = useFirebase();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [wasMessageSuccessfullySent, setWasMessageSuccessfullySent] =
    useState<boolean>(false);

  const handleNameChange = (nameInput: string) => {
    setName(nameInput);
  };

  const handleEmailChange = (emailInput: string) => {
    setEmail(emailInput);
  };

  const handleMessageChange = (messageInput: string) => {
    setMessage(messageInput);
  };

  const handleSubmit = () => {
    if (isFeatureFlagSet(DISABLE_MESSAGE_STORAGE_FLAG)) {
      setWasMessageSuccessfullySent(true);
      return;
    }

    const result = storeMessage(name, email, message);
    setWasMessageSuccessfullySent(result);
  };

  return (
    <ContactForm
      name={name}
      email={email}
      message={message}
      wasMessageSuccessfullySent={wasMessageSuccessfullySent}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
      onMessageChange={handleMessageChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ContactFormContainer;
