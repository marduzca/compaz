import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as FirebaseProvider from '../../providers/firebase/FirebaseProvider';
import ContactFormContainer from './ContactFormContainer';

describe('ContactFormContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');

  it('calls the function to store the message with name, email and content', async () => {
    const storeMessageMock = jest.fn().mockReturnValue(true);

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

    expect(storeMessageMock).toHaveBeenCalledWith(name, email, message);
    expect(
      screen.getByRole('img', { name: 'Contact.MESSAGE_SENT_ALT' })
    ).toBeVisible();
  });

  it('avoids storing message if url input was filled (only discoverable by bots)', async () => {
    const storeMessageMock = jest.fn().mockReturnValue(true);

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
    ).toBeNull();
  });
});
