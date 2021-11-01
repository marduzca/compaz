import React, { LegacyRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
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

export const RELOAD_EVENT = 'RELOAD';

interface NotificationProps {
  nodeRef?: LegacyRef<HTMLDivElement>;
  content: string;
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
      ref={props.nodeRef}
    >
      <img
        src={renderCorrespondingIcon()}
        alt={t(`Notification.${props.notificationType.toString()}`)}
      />
      <p>
        {props.content === RELOAD_EVENT ? (
          <Trans i18nKey="Notification.RELOAD_MESSAGE">
            Notification.RELOAD_MESSAGE <a href="/">Reload link</a>
          </Trans>
        ) : (
          t(props.content)
        )}
      </p>
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

Notification.defaultProps = {
  nodeRef: null,
};

export default Notification;
