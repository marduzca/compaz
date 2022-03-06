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
  onReloadClick: () => void;
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

  return (
    <div
      role="alert"
      className={`${styles.container} ${getCorrespondingBackgroundColor()}`}
      ref={props.nodeRef}
      aria-label={t(`Notification.${props.notificationType.toString()}`)}
    >
      <img
        src={
          {
            SUCCESS: successIcon,
            ERROR: errorIcon,
            INFO: infoIcon,
          }[props.notificationType]
        }
        alt={t(`Notification.${props.notificationType.toString()}`)}
        aria-hidden
      />
      <p>
        {props.content === RELOAD_EVENT ? (
          <Trans i18nKey="Notification.RELOAD_MESSAGE">
            Notification.RELOAD_MESSAGE
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href=""
              onClick={props.onReloadClick}
              aria-label={t('Notification.RELOAD_ANCHOR_DESCRIPTION')}
            >
              Reload link
            </a>
          </Trans>
        ) : (
          t(props.content)
        )}
      </p>
      <button
        type="button"
        title={t('Notification.CLOSE')}
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
