import React, { useEffect, useState } from 'react';
import Notification, { NotificationType } from './Notification';
import { NotificationEvent } from '../domain';

const NotificationContainer = () => {
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [notification, setNotification] = useState<NotificationEvent>({
    type: NotificationType.INFO,
    content: 'RELOAD',
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
