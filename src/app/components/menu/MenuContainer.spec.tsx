import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuContainer from './MenuContainer';
import * as useMediaQuery from '../useMediaQuery';

describe('MenuContainer', () => {
  const useMediaQueryMock = jest.spyOn(useMediaQuery, 'default');
  useMediaQueryMock.mockReturnValue(false);

  it('renders all header items', () => {
    render(
      <MenuContainer showMenuOnMobile={false} onHideMobileMenu={() => {}} />
    );

    const withinNavigation = within(screen.getByRole('banner'));

    expect(
      withinNavigation.getByRole('link', { name: 'Menu.GO_HOME' })
    ).toBeVisible();
    expect(
      withinNavigation.getByRole('link', { name: /Menu.HISTORY/ })
    ).toBeVisible();
    expect(
      withinNavigation.getByRole('link', { name: /Menu.HOW_TO_INSTALL/ })
    ).toBeVisible();
    expect(
      withinNavigation.getByRole('link', { name: /Menu.CONTACT/ })
    ).toBeVisible();
    expect(
      withinNavigation.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
    ).toBeVisible();
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
