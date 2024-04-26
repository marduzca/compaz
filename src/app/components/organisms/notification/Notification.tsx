import React, { LegacyRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import successIcon from '../../../static/svg/success.svg';
import errorIcon from '../../../static/svg/error.svg';
import infoIcon from '../../../static/svg/info.svg';
import CloseIcon from '../../../static/svg/close.svg?react';
import styles from './Notification.module.css';

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum EventType {
  NOTIFICATION = 'notification',
  UPDATE_AVAILABILITY = 'updateAvailability',
}

export const RELOAD_EVENT = 'RELOAD';

interface NotificationProps {
  nodeRef?: LegacyRef<HTMLDivElement>;
  content: string;
  notificationType: NotificationType;
  onReloadClick: () => void;
  onCloseButtonClick: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  nodeRef = null,
  content,
  notificationType,
  onReloadClick,
  onCloseButtonClick,
}) => {
  const { t } = useTranslation();

  const getCorrespondingBackgroundColor = () => {
    switch (notificationType) {
      case NotificationType.SUCCESS:
        return styles.success;
      case NotificationType.ERROR:
        return styles.error;
      default:
        return styles.info;
    }
  };

  return (
    <div
      role="alert"
      className={`${styles.container} ${getCorrespondingBackgroundColor()}`}
      ref={nodeRef}
      aria-label={t(`Notification.${notificationType.toString()}`)}
    >
      <img
        src={
          {
            SUCCESS: successIcon,
            ERROR: errorIcon,
            INFO: infoIcon,
          }[notificationType]
        }
        alt={t(`Notification.${notificationType.toString()}`)}
        loading="lazy"
        aria-hidden
      />
      <p>
        {content === RELOAD_EVENT ? (
          <Trans i18nKey="Notification.RELOAD_MESSAGE">
            Notification.RELOAD_MESSAGE
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/no-redundant-roles */}
            <a
              href=""
              onClick={onReloadClick}
              aria-label={t('Notification.RELOAD_ANCHOR_DESCRIPTION')}
              role="link"
            >
              Reload link
            </a>
          </Trans>
        ) : (
          t(content)
        )}
      </p>
      <button
        type="button"
        title={t('Notification.CLOSE')}
        className={styles.closeButton}
        onClick={onCloseButtonClick}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Notification;
