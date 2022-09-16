import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { useFirebase } from '../../../providers/firebase/FirebaseProvider';
import {
  DISABLE_MESSAGE_STORAGE_FLAG,
  isFeatureFlagSet,
} from '../../../../featureFlag/FeatureFlag';
import { NotificationType } from '../../../organisms/notification/Notification';
import { OFFLINE_ERROR_NOTIFICATION_KEY } from '../../../organisms/notification/NotificationContainer';
import { NotificationEvent } from '../../../domain';

const ContactFormContainer: React.FC = () => {
  const { storeMessage } = useFirebase();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [wasMessageSuccessfullySent, setWasMessageSuccessfullySent] =
    useState<boolean>(false);
  const [isMessageSendingInProgress, setIsMessageSendingInProgress] =
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

  const handleSubmit = async () => {
    setIsMessageSendingInProgress(true);

    if (isFeatureFlagSet(DISABLE_MESSAGE_STORAGE_FLAG)) {
      setWasMessageSuccessfullySent(true);
      setIsMessageSendingInProgress(false);
      return;
    }

    if (!window.navigator.onLine) {
      window.dispatchEvent(
        new CustomEvent('notification', {
          detail: {
            type: NotificationType.ERROR,
            content: OFFLINE_ERROR_NOTIFICATION_KEY,
          } as NotificationEvent,
        })
      );

      setWasMessageSuccessfullySent(false);
      setIsMessageSendingInProgress(false);
      return;
    }

    const result = await storeMessage(name, email, message);
    setWasMessageSuccessfullySent(result);
    setIsMessageSendingInProgress(false);
  };

  return (
    <ContactForm
      name={name}
      email={email}
      message={message}
      wasMessageSuccessfullySent={wasMessageSuccessfullySent}
      isMessageSendingInProgress={isMessageSendingInProgress}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
      onMessageChange={handleMessageChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ContactFormContainer;
