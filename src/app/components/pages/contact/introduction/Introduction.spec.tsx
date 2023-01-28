import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from './Introduction';

describe('Contact', () => {
  it('forwards the user to the correct personal website', () => {
    render(<Introduction />);

    expect(
      screen.getByRole('link', { name: 'Contact.LINKEDIN_LINK' })
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/miguelarduz/');

    expect(
      screen.getByRole('link', { name: 'Contact.INSTAGRAM_LINK' })
    ).toHaveAttribute('href', 'https://www.instagram.com/compaz_app/');

    expect(
      screen.getByRole('link', { name: 'Contact.FACEBOOK_LINK' })
    ).toHaveAttribute('href', 'https://www.facebook.com/compaz.application/');
  });
});
