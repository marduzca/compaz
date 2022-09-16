import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Notification, { NotificationType, RELOAD_EVENT } from './Notification';
import { NotificationEvent } from '../../domain';
import styles from './Notification.module.css';

export const GENERAL_ERROR_NOTIFICATION_KEY =
  'Notification.GENERAL_ERROR_MESSAGE';
export const OFFLINE_ERROR_NOTIFICATION_KEY =
  'Notification.OFFLINE_ERROR_MESSAGE';

const NotificationContainer = () => {
  const nodeRef = useRef(null);

  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<
    ServiceWorkerRegistration | undefined
  >(undefined);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationEvent>({
    type: NotificationType.INFO,
    content: '',
  });

  useEffect(() => {
    const handleNotificationEvent = (notificationEvent: CustomEvent) => {
      setShowNotification(true);

      if (notificationEvent.detail.serviceWorkerRegistration) {
        setServiceWorkerRegistration(
          notificationEvent.detail.serviceWorkerRegistration
        );

        setNotification({
          content: RELOAD_EVENT,
          type: NotificationType.INFO,
        } as NotificationEvent);
      } else {
        setNotification({
          content: notificationEvent.detail.content,
          type: notificationEvent.detail.type,
        } as NotificationEvent);
      }
    };

    window.addEventListener(
      'notification',
      handleNotificationEvent as EventListener
    );

    window.addEventListener(
      'updateAvailability',
      handleNotificationEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        'notification',
        handleNotificationEvent as EventListener
      );

      window.removeEventListener(
        'updateAvailability',
        handleNotificationEvent as EventListener
      );
    };
  }, []);

  const handleCloseButtonClick = () => {
    setShowNotification(false);
  };

  const handleReloadClick = () => {
    const registrationWaiting = serviceWorkerRegistration?.waiting;

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', () => {
        window.location.reload();
      });
    }
  };

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
        onReloadClick={handleReloadClick}
        onCloseButtonClick={handleCloseButtonClick}
      />
    </CSSTransition>
  );
};

export default NotificationContainer;
