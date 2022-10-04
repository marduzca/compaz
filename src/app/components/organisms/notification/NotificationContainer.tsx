import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Notification, { NotificationType } from './Notification';
import { NotificationEvent } from '../../domain';
import styles from './Notification.module.css';
import appInfo from '../../../../../package.json';

export const GENERAL_ERROR_NOTIFICATION_KEY =
  'Notification.GENERAL_ERROR_MESSAGE';
export const OFFLINE_ERROR_NOTIFICATION_KEY =
  'Notification.OFFLINE_ERROR_MESSAGE';

export const APP_VERSION_KEY = 'app_version';

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
    const triggerNotification = (notificationEvent: CustomEvent) => {
      setNotification({
        content: notificationEvent.detail.content,
        type: notificationEvent.detail.type,
      } as NotificationEvent);

      setShowNotification(true);
    };

    const handleUpdateAvailabilityEvent = (
      updateAvailabilityEvent: CustomEvent
    ) => {
      const currentAppVersion = localStorage.getItem(APP_VERSION_KEY);

      if (!currentAppVersion || currentAppVersion === appInfo.version) {
        return;
      }
      if (!updateAvailabilityEvent.detail.serviceWorkerRegistration) {
        return;
      }

      setServiceWorkerRegistration(
        updateAvailabilityEvent.detail.serviceWorkerRegistration
      );

      triggerNotification(updateAvailabilityEvent);

      localStorage.setItem(APP_VERSION_KEY, appInfo.version);
    };

    window.addEventListener(
      'notification',
      triggerNotification as EventListener
    );

    window.addEventListener(
      'updateAvailability',
      handleUpdateAvailabilityEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        'notification',
        triggerNotification as EventListener
      );

      window.removeEventListener(
        'updateAvailability',
        handleUpdateAvailabilityEvent as EventListener
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
