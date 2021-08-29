import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuContainer from './MenuContainer';

describe('MenuContainer', () => {
  it('renders all header items', () => {
    render(
      <MenuContainer showMenuOnMobile={false} onHideMobileMenu={() => {}} />
    );

    expect(screen.getByRole('button', { name: 'home' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
    ).toBeVisible();
    expect(screen.getByText('Menu.HISTORY')).toBeVisible();
    expect(screen.getByText('Menu.HOW_TO_INSTALL')).toBeVisible();
    expect(screen.getByText('Menu.CONTACT')).toBeVisible();
  });

  describe('when switching language', () => {
    describe('when clicking the Bolivian Flag', () => {
      it('switches the language to Spanish', () => {
        localStorage.setItem('i18nextLng', 'en');

        render(
          <MenuContainer onHideMobileMenu={() => {}} showMenuOnMobile={false} />
        );

        userEvent.click(
          screen.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('es');
      });
    });

    describe('when clicking the USA Flag', () => {
      it('switches the language to English', () => {
        localStorage.setItem('i18nextLng', 'es');

        render(
          <MenuContainer showMenuOnMobile={false} onHideMobileMenu={() => {}} />
        );

        userEvent.click(
          screen.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('en');
      });
    });
  });
});
