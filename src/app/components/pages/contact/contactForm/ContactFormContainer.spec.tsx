import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as FirebaseProvider from '../../../providers/firebase/FirebaseProvider';
import ContactFormContainer from './ContactFormContainer';
import { NotificationType } from '../../../organisms/notification/Notification';
import { OFFLINE_ERROR_NOTIFICATION_KEY } from '../../../organisms/notification/NotificationContainer';
import { NotificationEvent } from '../../../domain';

describe('ContactFormContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');

  const storeMessageMock = jest.fn().mockResolvedValue(true);

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [],
      lines: [],
      storeMessage: storeMessageMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls the function to store the message with name, email and content', async () => {
    const storeMessageMock = jest.fn().mockImplementation(async () => {
      // Wait before returning to give time to the test to verify that the loader is shown
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
      return true;
    });
    useFirebaseMock.mockReturnValue({
      stations: [],
      lines: [],
      storeMessage: storeMessageMock,
    });

    const name = 'El Chavo';
    const email = 'chavonet@pokemail.com';
    const message = 'Eso eso eso...';

    render(<ContactFormContainer />);

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.NAME_LABEL' }),
      name
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.EMAIL_LABEL' }),
      email
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.MESSAGE_PLACEHOLDER' }),
      message
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Contact.SEND_BUTTON' })
    );

    // First we see the loader
    expect(
      await screen.getByRole('alert', { name: 'Contact.MESSAGE_LOADER' })
    ).toBeVisible();

    // After the message was successfully sent, we see the success icon
    expect(storeMessageMock).toHaveBeenCalledWith(name, email, message);
    expect(
      await screen.findByRole('alert', { name: 'Contact.MESSAGE_SENT_ALT' })
    ).toBeVisible();
  });

  it('avoids storing message if url input was filled (only discoverable by bots)', async () => {
    render(<ContactFormContainer />);

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.NAME_LABEL' }),
      'name'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.EMAIL_LABEL' }),
      'email@email.com'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.MESSAGE_PLACEHOLDER' }),
      'message'
    );

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Url' }),
      'I am a bot'
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Contact.SEND_BUTTON' })
    );

    expect(storeMessageMock).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('img', { name: 'Contact.MESSAGE_SENT_ALT' })
    ).not.toBeInTheDocument();
  });

  it("doesn't store message and dispatches error event for notification to pop-up while offline", async () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const navigatorOnlineSpy = jest.spyOn(window.navigator, 'onLine', 'get');
    navigatorOnlineSpy.mockReturnValue(false);

    render(<ContactFormContainer />);

    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.NAME_LABEL' }),
      'name'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.EMAIL_LABEL' }),
      'email@email.com'
    );
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Contact.MESSAGE_PLACEHOLDER' }),
      'message'
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Contact.SEND_BUTTON' })
    );

    expect(storeMessageMock).not.toHaveBeenCalled();
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      new CustomEvent('notification', {
        detail: {
          type: NotificationType.ERROR,
          content: OFFLINE_ERROR_NOTIFICATION_KEY,
        } as NotificationEvent,
      })
    );
    expect(
      screen.queryByRole('img', { name: 'Contact.MESSAGE_SENT_ALT' })
    ).not.toBeInTheDocument();
  });
});
