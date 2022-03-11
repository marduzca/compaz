import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import ContactFormContainer from './ContactFormContainer';

describe('ContactFormContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');

  it('calls the function to store the message with name, email and content', () => {
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

    userEvent.type(screen.getByRole('textbox', { name: 'Name' }), name);
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), email);
    userEvent.type(screen.getByRole('textbox', { name: 'Message' }), message);

    userEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(storeMessageMock).toHaveBeenCalledWith(name, email, message);
    expect(
      screen.getByRole('img', { name: 'Email successfully sent!' })
    ).toBeVisible();
  });

  it('avoids storing message if url input was filled (only discoverable by bots)', () => {
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

    userEvent.type(screen.getByRole('textbox', { name: 'Name' }), name);
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), email);
    userEvent.type(screen.getByRole('textbox', { name: 'Url' }), 'I am a bot');
    userEvent.type(screen.getByRole('textbox', { name: 'Message' }), message);

    userEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(storeMessageMock).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('img', { name: 'Email successfully sent!' })
    ).toBeNull();
  });
});
