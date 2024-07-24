import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from './Introduction';

describe('Contact', () => {
  it('forwards the user to the correct personal website', () => {
    render(<Introduction />);

    expect(
      screen.getByRole('link', { name: 'LinkedIn account' }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/miguelarduz/');

    expect(
      screen.getByRole('link', { name: 'Instagram account' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/compaz.app/');

    expect(
      screen.getByRole('link', { name: 'Facebook account' }),
    ).toHaveAttribute('href', 'https://www.facebook.com/compaz.application/');
  });
});
