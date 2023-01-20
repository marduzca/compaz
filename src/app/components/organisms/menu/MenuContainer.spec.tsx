import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MenuContainer from './MenuContainer';
import { NavigationLink } from './Menu';

describe('MenuContainer', () => {
  it('goes to the corresponding url when clicking on a nav link', async () => {
    const history = createMemoryHistory({
      initialEntries: [NavigationLink.BASE],
    });

    render(
      <Router location={history.location} navigator={history}>
        <MenuContainer showMenuOnMobile={false} onHideMobileMenu={() => {}} />
      </Router>
    );

    const withinNavigation = within(screen.getByRole('banner'));

    expect(
      withinNavigation.getByRole('link', { name: 'Menu.GO_HOME' })
    ).toHaveAttribute('aria-current', 'page');

    await userEvent.click(
      withinNavigation.getByRole('link', { name: /Menu.HOME/ })
    );
    expect(history.location.pathname).toBe(NavigationLink.BASE);
    expect(
      withinNavigation.getByRole('link', { name: /Menu.HOME/ })
    ).toHaveAttribute('aria-current', 'page');

    await userEvent.click(
      withinNavigation.getByRole('link', { name: /Menu.MAP/ })
    );
    expect(history.location.pathname).toBe(NavigationLink.MAP);
    expect(
      withinNavigation.getByRole('link', { name: /Menu.MAP/ })
    ).toHaveAttribute('aria-current', 'page');

    await userEvent.click(
      withinNavigation.getByRole('link', { name: /Menu.HOW_TO_INSTALL/ })
    );
    expect(history.location.pathname).toBe(NavigationLink.HOW_TO_INSTALL);
    expect(
      withinNavigation.getByRole('link', { name: /Menu.HOW_TO_INSTALL/ })
    ).toHaveAttribute('aria-current', 'page');

    await userEvent.click(
      withinNavigation.getByRole('link', { name: /Menu.CONTACT/ })
    );
    expect(history.location.pathname).toBe(NavigationLink.CONTACT);
    expect(
      withinNavigation.getByRole('link', { name: /Menu.CONTACT/ })
    ).toHaveAttribute('aria-current', 'page');

    await userEvent.click(
      withinNavigation.getByRole('link', { name: /Menu.ABOUT/ })
    );
    expect(history.location.pathname).toBe(NavigationLink.ABOUT);
    expect(
      withinNavigation.getByRole('link', { name: /Menu.ABOUT/ })
    ).toHaveAttribute('aria-current', 'page');
  });

  describe('when switching language', () => {
    describe('when clicking the Bolivian Flag', () => {
      it('switches the language to Spanish', async () => {
        localStorage.setItem('i18nextLng', 'en');

        render(
          <MemoryRouter>
            <MenuContainer
              onHideMobileMenu={() => {}}
              showMenuOnMobile={false}
            />
          </MemoryRouter>
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('es');
      });
    });

    describe('when clicking the USA Flag', () => {
      it('switches the language to English', async () => {
        localStorage.setItem('i18nextLng', 'es');

        render(
          <MemoryRouter>
            <MenuContainer
              showMenuOnMobile={false}
              onHideMobileMenu={() => {}}
            />
          </MemoryRouter>
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'Menu.CHANGE_LANGUAGE' })
        );

        expect(localStorage.getItem('i18nextLng')).toBe('en');
      });
    });
  });
});
