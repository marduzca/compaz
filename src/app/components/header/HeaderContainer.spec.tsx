import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders all header items', () => {
    render(<HeaderContainer />);

    expect(screen.getByRole('button', { name: 'home' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'language-selector' })
    ).toBeVisible();
    expect(screen.getByText('Header.HISTORY')).toBeVisible();
    expect(screen.getByText('Header.HOW_TO_INSTALL')).toBeVisible();
    expect(screen.getByText('Header.CONTACT')).toBeVisible();
    expect(screen.getByText('Header.ABOUT_US')).toBeVisible();
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
