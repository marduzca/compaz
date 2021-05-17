import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders all header items', () => {
    render(<HeaderContainer />);

    expect(screen.getByTitle('logo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'language-selector' })
    ).toBeInTheDocument();
    expect(screen.getByText('Header.HISTORY')).toBeInTheDocument();
    expect(screen.getByText('Header.HOW_TO_INSTALL')).toBeInTheDocument();
    expect(screen.getByText('Header.CONTACT')).toBeInTheDocument();
    expect(screen.getByText('Header.ABOUT_US')).toBeInTheDocument();
  });

  describe('when switching language', () => {
    describe('when clicking the Bolivian Flag', () => {
      it('switches the language to Spanish', () => {
        localStorage.setItem('i18nextLng', 'en');

        render(<HeaderContainer />);

        userEvent.click(
          screen.getByRole('button', { name: 'language-selector' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('es');
      });
    });

    describe('when clicking the USA Flag', () => {
      it('switches the language to English', () => {
        localStorage.setItem('i18nextLng', 'es');

        render(<HeaderContainer />);

        userEvent.click(
          screen.getByRole('button', { name: 'language-selector' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('en');
      });
    });
  });
});
