import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { useFirebase } from '../../providers/FirebaseProvider';

const ContactFormContainer: React.FC = () => {
  const { storeMessage } = useFirebase();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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
    storeMessage(name, email, message);
  };

  return (
    <ContactForm
      name={name}
      email={email}
      message={message}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
      onMessageChange={handleMessageChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ContactFormContainer;
