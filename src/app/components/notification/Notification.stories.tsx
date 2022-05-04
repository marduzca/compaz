import React from 'react';
import { actions } from '@storybook/addon-actions';
import Notification, { NotificationType, RELOAD_EVENT } from './Notification';

export default {
  component: Notification,
  title: 'Notification',
};

export const InfoNotificationNormalState = () => (
  <Notification
    notificationType={NotificationType.INFO}
    content="This is an info message."
    onReloadClick={actions('onReloadClick').onReloadClick}
    onCloseButtonClick={actions('onCloseButtonClick').onCloseButtonClick}
  />
);

export const ErrorNotificationNormalState = () => (
  <Notification
    notificationType={NotificationType.ERROR}
    content="This is an error message."
    onReloadClick={actions('onReloadClick').onReloadClick}
    onCloseButtonClick={actions('onCloseButtonClick').onCloseButtonClick}
  />
);

export const SuccessNotificationNormalState = () => (
  <Notification
    notificationType={NotificationType.SUCCESS}
    content="This is a success message."
    onReloadClick={actions('onReloadClick').onReloadClick}
    onCloseButtonClick={actions('onCloseButtonClick').onCloseButtonClick}
  />
);

export const WithLongTextNormalState = () => (
  <Notification
    notificationType={NotificationType.ERROR}
    content="This is a long message that is supposed to be long enough to break to a
    second line and see what happens in that case. It should be long enough that it breaks line even in a laptop,
    so that means it is pretty big. My favourite color is purple. Also I like to have a small chocolate after lunch before
    I take my coffee and go back to work. This last sentence is just to fill the third line."
    onReloadClick={actions('onReloadClick').onReloadClick}
    onCloseButtonClick={actions('onCloseButtonClick').onCloseButtonClick}
  />
);

export const WithReloadMessageNormalState = () => (
  <Notification
    notificationType={NotificationType.INFO}
    content={RELOAD_EVENT}
    onReloadClick={actions('onReloadClick').onReloadClick}
    onCloseButtonClick={actions('onCloseButtonClick').onCloseButtonClick}
  />
);
