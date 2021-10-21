import React from 'react';
import { act, render, screen } from '@testing-library/react';
import NotificationContainer from './NotificationContainer';
import { NotificationType, RELOAD_EVENT } from './Notification';
import { NotificationEvent } from '../domain';

describe('NotificationContainer', () => {
  it('renders reload info notification when reload event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText(
        'There is new content available. Click here to update.'
      )
    ).toBeNull();

    const reloadNotificationEvent = new CustomEvent('notification', {
      detail: {
        type: NotificationType.INFO,
        content: RELOAD_EVENT,
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(reloadNotificationEvent);
    });

    expect(
      screen.getByRole('img', { name: 'Notification.INFO' })
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'Reload link' })).toBeVisible();
    expect(screen.getByText('Notification.RELOAD_MESSAGE')).toBeVisible();
  });

  it('renders info notification when info notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(screen.queryByText('this is an info notification')).toBeNull();

    const infoNotificationEvent = new CustomEvent('notification', {
      detail: {
        type: NotificationType.INFO,
        content: 'this is an info notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('img', { name: 'Notification.INFO' })
    ).toBeVisible();
    expect(screen.getByText('this is an info notification')).toBeVisible();
  });

  it('renders success notification when success notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(screen.queryByText('this is a success notification')).toBeNull();

    const infoNotificationEvent = new CustomEvent('notification', {
      detail: {
        type: NotificationType.SUCCESS,
        content: 'this is a success notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('img', { name: 'Notification.SUCCESS' })
    ).toBeVisible();
    expect(screen.getByText('this is a success notification')).toBeVisible();
  });

  it('renders error notification when error notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(screen.queryByText('this is an error notification')).toBeNull();

    const infoNotificationEvent = new CustomEvent('notification', {
      detail: {
        type: NotificationType.ERROR,
        content: 'this is an error notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('img', { name: 'Notification.ERROR' })
    ).toBeVisible();
    expect(screen.getByText('this is an error notification')).toBeVisible();
  });
});
