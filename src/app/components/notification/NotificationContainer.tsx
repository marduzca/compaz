import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Notification, { NotificationType } from './Notification';
import { NotificationEvent } from '../domain';
import styles from './Notification.module.css';

export const GENERAL_ERROR_NOTIFICATION_KEY =
  'Notification.GENERAL_ERROR_MESSAGE';

const NotificationContainer = () => {
  const nodeRef = useRef(null);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationEvent>({
    type: NotificationType.INFO,
    content: '',
  });

  const handleCloseButtonClick = () => {
    setShowNotification(false);
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
    <CSSTransition
      nodeRef={nodeRef}
      in={showNotification}
      timeout={750}
      classNames={{ ...styles }}
      unmountOnExit
    >
      <Notification
        nodeRef={nodeRef}
        content={notification.content}
        notificationType={notification.type}
        onCloseButtonClick={handleCloseButtonClick}
      />
    </CSSTransition>
  );
};

export default NotificationContainer;
