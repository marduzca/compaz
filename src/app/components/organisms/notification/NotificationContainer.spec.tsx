import React from 'react';
import { act, render, screen } from '@testing-library/react';
import NotificationContainer from './NotificationContainer';
import { NotificationType } from './Notification';
import { NotificationEvent, UpdateAvailabilityEvent } from '../../domain';

describe('NotificationContainer', () => {
  it('renders reload info notification when reload event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText(
        'There is new content available. Click here to update.'
      )
    ).not.toBeInTheDocument();

    const updateAvailabilityEvent = new CustomEvent('updateAvailability', {
      detail: {
        serviceWorkerRegistration: {},
      } as UpdateAvailabilityEvent,
    });

    act(() => {
      window.dispatchEvent(updateAvailabilityEvent);
    });

    expect(
      screen.getByRole('alert', { name: 'Notification.INFO' })
    ).toBeVisible();
    expect(
      screen.getByRole('link', {
        name: 'Notification.RELOAD_ANCHOR_DESCRIPTION',
      })
    ).toBeVisible();
    expect(screen.getByText('Notification.RELOAD_MESSAGE')).toBeVisible();
  });

  it('renders info notification when info notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is an info notification')
    ).not.toBeInTheDocument();

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
      screen.getByRole('alert', { name: 'Notification.INFO' })
    ).toBeVisible();
    expect(screen.getByText('this is an info notification')).toBeVisible();
  });

  it('renders success notification when success notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is a success notification')
    ).not.toBeInTheDocument();

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
      screen.getByRole('alert', { name: 'Notification.SUCCESS' })
    ).toBeVisible();
    expect(screen.getByText('this is a success notification')).toBeVisible();
  });

  it('renders error notification when error notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is an error notification')
    ).not.toBeInTheDocument();

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
      screen.getByRole('alert', { name: 'Notification.ERROR' })
    ).toBeVisible();
    expect(screen.getByText('this is an error notification')).toBeVisible();
  });
});
