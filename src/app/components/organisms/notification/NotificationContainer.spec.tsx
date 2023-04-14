import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import NotificationContainer from './NotificationContainer';
import { EventType, NotificationType, RELOAD_EVENT } from './Notification';
import { NotificationEvent, UpdateAvailabilityEvent } from '../../domain';

describe('NotificationContainer', () => {
  it('renders info notification when info notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is an info notification')
    ).not.toBeInTheDocument();

    const infoNotificationEvent = new CustomEvent(EventType.NOTIFICATION, {
      detail: {
        type: NotificationType.INFO,
        content: 'this is an info notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('alert', { name: 'Information notification' })
    ).toBeVisible();
    expect(screen.getByText('this is an info notification')).toBeVisible();
  });

  it('renders success notification when success notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is a success notification')
    ).not.toBeInTheDocument();

    const infoNotificationEvent = new CustomEvent(EventType.NOTIFICATION, {
      detail: {
        type: NotificationType.SUCCESS,
        content: 'this is a success notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('alert', { name: 'Success notification' })
    ).toBeVisible();
    expect(screen.getByText('this is a success notification')).toBeVisible();
  });

  it('renders error notification when error notification event is triggered', () => {
    render(<NotificationContainer />);

    expect(
      screen.queryByText('this is an error notification')
    ).not.toBeInTheDocument();

    const infoNotificationEvent = new CustomEvent(EventType.NOTIFICATION, {
      detail: {
        type: NotificationType.ERROR,
        content: 'this is an error notification',
      } as NotificationEvent,
    });

    act(() => {
      window.dispatchEvent(infoNotificationEvent);
    });

    expect(
      screen.getByRole('alert', { name: 'Error notification' })
    ).toBeVisible();
    expect(screen.getByText('this is an error notification')).toBeVisible();
  });

  it('should render update notification when new version is available', () => {
    render(<NotificationContainer />);

    const updateAvailabilityEvent = new CustomEvent(
      EventType.UPDATE_AVAILABILITY,
      {
        detail: {
          serviceWorkerRegistration: {},
          type: NotificationType.INFO,
          content: RELOAD_EVENT,
        } as UpdateAvailabilityEvent,
      }
    );

    act(() => {
      window.dispatchEvent(updateAvailabilityEvent);
    });

    const withinNotification = within(
      screen.getByRole('alert', { name: 'Information notification' })
    );

    expect(
      withinNotification.getByRole('link', {
        name: 'Click here to refresh the page and download the newest updates',
      })
    ).toBeVisible();
    expect(
      withinNotification.getByText(/There are new updates to the app./)
    ).toBeVisible();
  });
});
