import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsContainer, { Browser } from './InstructionsContainer';

describe('InstructionsContainer', () => {
  const selectOptionFromDropdown = async (
    selectLabel: string,
    option: string,
  ) => {
    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: selectLabel,
        }),
      );
    });
    await act(async () => {
      await userEvent.selectOptions(
        screen.getByRole('listbox', {
          name: selectLabel,
        }),
        screen.getByRole('option', {
          name: option,
        }),
      );
    });
  };

  it('should show only the available browsers for the selected device type', async () => {
    render(<InstructionsContainer />);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Browser',
        }),
      );
    });
    const browserOptionsForLaptop = within(
      screen.getByRole('listbox', {
        name: 'Browser',
      }),
    ).getAllByRole('option');

    expect(browserOptionsForLaptop).toHaveLength(1);
    expect(browserOptionsForLaptop[0]).toHaveTextContent(Browser.GOOGLE_CHROME);

    await selectOptionFromDropdown('Device', 'Android / Tablet');

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Browser',
        }),
      );
    });
    const browserOptionsForMobile = within(
      screen.getByRole('listbox', {
        name: 'Browser',
      }),
    ).getAllByRole('option');

    expect(browserOptionsForMobile).toHaveLength(3);
    expect(browserOptionsForMobile[0]).toHaveTextContent(Browser.GOOGLE_CHROME);
    expect(browserOptionsForMobile[1]).toHaveTextContent(
      Browser.MOZILLA_FIREFOX,
    );
    expect(browserOptionsForMobile[2]).toHaveTextContent(
      Browser.SAMSUNG_INTERNET,
    );
  });

  it('shows the correct installation gif and steps when switching devices and browsers', async () => {
    render(<InstructionsContainer />);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_laptop_chrome/,
    );
    expect(
      screen.getByText(
        'Go to compaz.app and click the Install icon on the address bar.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "In the newly opened window, confirm by clicking 'Install'.",
      ),
    ).toBeVisible();

    await selectOptionFromDropdown('Device', 'Android / Tablet');

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_chrome/,
    );
    expect(
      screen.getByText(
        'Go to compaz.app and open the browser menu by clicking on the three dots at the top right of the screen.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "In the newly opened menu, click 'Install compaz' or ‘Install’.",
      ),
    ).toBeVisible();

    await selectOptionFromDropdown('Browser', Browser.MOZILLA_FIREFOX);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_firefox/,
    );
    expect(
      screen.getByText(
        'Go to compaz.app and open the browser menu by clicking on the three dots at the bottom right of the screen.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "In the newly opened menu, click 'Install compaz' or ‘Install’.",
      ),
    ).toBeVisible();

    await selectOptionFromDropdown('Browser', Browser.SAMSUNG_INTERNET);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_samsung/,
    );
    expect(
      screen.getByText(
        'Go to compaz.app and open the browser menu by clicking on the three lines at the bottom right of the screen.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        'In the newly opened menu, click on ‘Add page to’, select ‘Home Screen’ and confirm.',
      ),
    ).toBeVisible();

    await selectOptionFromDropdown('Device', 'iPhone / iPad');

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_iphone_safari/,
    );
    expect(
      screen.getByText(
        'Go to compaz.app and open the browser menu by clicking on the Share icon (box with an arrow) next to the address bar.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        'In the newly opened menu, click on ‘Add to Home Screen’ and confirm.',
      ),
    ).toBeVisible();
  });

  it('should fallback to first available browser when switching device and another unsupported browser is selected', async () => {
    render(<InstructionsContainer />);

    await selectOptionFromDropdown('Device', 'Android / Tablet');

    await selectOptionFromDropdown('Browser', Browser.MOZILLA_FIREFOX);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_firefox/,
    );

    await selectOptionFromDropdown('Device', 'iPhone / iPad');

    expect(
      within(
        screen.getByRole('combobox', {
          name: 'Browser',
        }) as HTMLSelectElement,
      ).getByText(Browser.SAFARI),
    ).toBeVisible();
    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_iphone_safari/,
    );
  });
});
