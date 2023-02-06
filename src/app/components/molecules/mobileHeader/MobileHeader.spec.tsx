import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { NavigationLink } from '../../organisms/menu/Menu';
import MobileHeader from './MobileHeader';

describe('MobileHeader', () => {
  it('navigates to home page when clicking home link', async () => {
    const history = createMemoryHistory({
      initialEntries: [NavigationLink.BASE],
    });

    render(
      <Router location={history.location} navigator={history}>
        <MobileHeader onMenuButtonClick={() => {}} />
      </Router>
    );

    await userEvent.click(screen.getByRole('link', { name: /Menu.GO_HOME/ }));

    expect(history.location.pathname).toBe(NavigationLink.BASE);
  });

  it('navigates to map page when clicking full map link', async () => {
    const history = createMemoryHistory({
      initialEntries: [NavigationLink.BASE],
    });

    render(
      <Router location={history.location} navigator={history}>
        <MobileHeader onMenuButtonClick={() => {}} isNavigationPage />
      </Router>
    );

    await userEvent.click(screen.getByRole('link', { name: /Map.GO_TO_MAP/ }));

    expect(history.location.pathname).toBe(NavigationLink.MAP);
  });
});
