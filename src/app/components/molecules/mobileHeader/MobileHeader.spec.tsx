import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import { NavigationLink } from '../../organisms/menu/Menu';
import MobileHeader from './MobileHeader';

const CurrentPath = () => (
  <div data-testid="path">{useLocation().pathname}</div>
);

describe('MobileHeader', () => {
  it('navigates to home page when clicking home link', async () => {
    render(
      <MemoryRouter initialEntries={[NavigationLink.BASE]}>
        <MobileHeader onMenuButtonClick={() => {}} />
        <CurrentPath />
      </MemoryRouter>,
    );

    await userEvent.click(
      screen.getByRole('link', { name: /Go to home page/ }),
    );

    expect(screen.getByTestId('path')).toHaveTextContent(NavigationLink.BASE);
  });

  it('navigates to map page when clicking full map link', async () => {
    render(
      <MemoryRouter initialEntries={[NavigationLink.BASE]}>
        <MobileHeader onMenuButtonClick={() => {}} isNavigationPage />
        <CurrentPath />
      </MemoryRouter>,
    );

    await userEvent.click(
      screen.getByRole('link', {
        name: /See map with the complete teleférico network/,
      }),
    );

    expect(screen.getByTestId('path')).toHaveTextContent(NavigationLink.MAP);
  });
});
