import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders all header items', () => {
    render(<HeaderContainer />);

    expect(screen.getByTitle('logo')).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'language-selector' })
    ).toBeInTheDocument();
    expect(screen.getByText('Header.HISTORY')).toBeInTheDocument();
    expect(screen.getByText('Header.HOW_TO_INSTALL')).toBeInTheDocument();
    expect(screen.getByText('Header.CONTACT')).toBeInTheDocument();
    expect(screen.getByText('Header.ABOUT_US')).toBeInTheDocument();
  });

  describe('when switching language', () => {
    describe('when choosing the Bolivian Flag', () => {
      it('switches the language to Spanish', () => {
        render(<HeaderContainer />);

        userEvent.selectOptions(
          screen.getByRole('combobox', { name: 'language-selector' }),
          '🇧🇴'
        );

        expect(localStorage.getItem('i18nextLng')).toBe('es');
      });
    });

    describe('when choosing the USA Flag', () => {
      it('switches the language to English', () => {
        render(<HeaderContainer />);

        userEvent.selectOptions(
          screen.getByRole('combobox', { name: 'language-selector' }),
          '🇺🇸'
        );

        expect(localStorage.getItem('i18nextLng')).toBe('en');
      });
    });
  });
});
