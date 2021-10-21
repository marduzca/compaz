import React, { useEffect, useState } from 'react';
import Notification, { NotificationType } from './Notification';
import { NotificationEvent } from '../domain';

export const GENERAL_ERROR_NOTIFICATION_KEY =
  'Notification.GENERAL_ERROR_MESSAGE';

const NotificationContainer = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationEvent>({
    type: NotificationType.INFO,
    content: '',
  });

  const handleCloseButtonClick = () => {
    setShowNotification(false);

    setNotification({
      type: NotificationType.INFO,
      content: '',
    });
  };

  useEffect(() => {
    const handleNotificationEvent = (notificationEvent: CustomEvent) => {
      setShowNotification(true);

      setNotification({
        content: notificationEvent.detail.content,
        type: notificationEvent.detail.type,
      } as NotificationEvent);
    };

    window.addEventListener(
      'notification',
      handleNotificationEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        'notification',
        handleNotificationEvent as EventListener
      );
    };
  }, []);

  return (
    <>
      {showNotification && (
        <Notification
          content={notification.content}
          notificationType={notification.type}
          onCloseButtonClick={handleCloseButtonClick}
        />
      )}
    </>
  );
};

export default NotificationContainer;
