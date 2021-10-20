import React, { useEffect, useState } from 'react';
import Notification, { NotificationType } from './Notification';
import { NotificationEvent } from '../domain';

const NotificationContainer = () => {
  const [notification, setNotification] = useState<NotificationEvent>({
    type: NotificationType.INFO,
    content: '',
  });

  const handleCloseButtonClick = () => {
    setNotification({
      type: NotificationType.INFO,
      content: '',
    });
  };

  useEffect(() => {
    const handleNotificationEvent = (notificationEvent: CustomEvent) => {
      setNotification({
        content: notificationEvent.detail.content,
        type: notificationEvent.detail.type,
      } as NotificationEvent);
    };

    document.addEventListener(
      'notification',
      handleNotificationEvent as EventListener
    );

    return () => {
      document.removeEventListener(
        'notification',
        handleNotificationEvent as EventListener
      );
    };
  }, []);

  return (
    <>
      {notification.content && (
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
