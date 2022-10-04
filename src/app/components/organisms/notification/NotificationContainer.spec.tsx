import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import NotificationContainer, {
  APP_VERSION_KEY,
} from './NotificationContainer';
import { NotificationType, RELOAD_EVENT } from './Notification';
import { NotificationEvent, UpdateAvailabilityEvent } from '../../domain';

const currentAppVersion = '1.2.0';

jest.mock(
  '../../../../../package.json',
  () => ({
    version: '1.2.0',
  }),
  { virtual: true }
);

describe('NotificationContainer', () => {
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

  describe('versioning', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('should not render update notification when the current and stored app versions are the same', () => {
      localStorage.setItem(APP_VERSION_KEY, currentAppVersion);

      render(<NotificationContainer />);

      const updateAvailabilityEvent = new CustomEvent('updateAvailability', {
        detail: {
          serviceWorkerRegistration: {},
        } as UpdateAvailabilityEvent,
      });

      act(() => {
        window.dispatchEvent(updateAvailabilityEvent);
      });

      expect(
        screen.queryByRole('alert', { name: 'Notification.INFO' })
      ).not.toBeInTheDocument();
    });

    it('should render update notification and store new version when the current app version is different to the stored version', () => {
      localStorage.setItem(APP_VERSION_KEY, '1.0.0');

      render(<NotificationContainer />);

      const updateAvailabilityEvent = new CustomEvent('updateAvailability', {
        detail: {
          serviceWorkerRegistration: {},
          type: NotificationType.INFO,
          content: RELOAD_EVENT,
        } as UpdateAvailabilityEvent,
      });

      act(() => {
        window.dispatchEvent(updateAvailabilityEvent);
      });

      const withinNotification = within(
        screen.getByRole('alert', { name: 'Notification.INFO' })
      );

      expect(
        withinNotification.getByRole('link', {
          name: 'Notification.RELOAD_ANCHOR_DESCRIPTION',
        })
      ).toBeVisible();
      expect(
        withinNotification.getByText('Notification.RELOAD_MESSAGE')
      ).toBeVisible();
      expect(localStorage.getItem(APP_VERSION_KEY)).toBe(currentAppVersion);
    });
  });
});
