import React from 'react';
import { useTranslation } from 'react-i18next';
import successIcon from '../../static/img/success.svg';
import errorIcon from '../../static/img/error.svg';
import infoIcon from '../../static/img/info.svg';
import { ReactComponent as CloseIcon } from '../../static/img/close.svg';
import styles from './Notification.module.css';

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface NotificationProps {
  // This is intended for passing your own paragraph with a clickable anchor inside
  content: string | React.ReactNode;
  notificationType: NotificationType;
  onCloseButtonClick: () => void;
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { t } = useTranslation();

  const getCorrespondingBackgroundColor = () => {
    switch (props.notificationType) {
      case NotificationType.SUCCESS:
        return styles.success;
      case NotificationType.ERROR:
        return styles.error;
      default:
        return styles.info;
    }
  };

  const renderCorrespondingIcon = () => {
    switch (props.notificationType) {
      case NotificationType.SUCCESS:
        return successIcon;
      case NotificationType.ERROR:
        return errorIcon;
      default:
        return infoIcon;
    }
  };

  return (
    <div
      role="alert"
      className={`${styles.container} ${getCorrespondingBackgroundColor()}`}
    >
      <img
        src={renderCorrespondingIcon()}
        alt={t(`Notification.${props.notificationType.toString()}`)}
      />
      {typeof props.content === 'string' ? (
        <p>{props.content}</p>
      ) : (
        props.content
      )}
      <button
        type="button"
        className={styles.closeButton}
        onClick={props.onCloseButtonClick}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Notification;
