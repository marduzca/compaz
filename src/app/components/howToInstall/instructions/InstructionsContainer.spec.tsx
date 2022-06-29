import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsContainer, { Browser } from './InstructionsContainer';

describe('InstructionsContainer', () => {
  const selectOptionFromDropdown = async (
    selectLabel: string,
    option: string
  ) => {
    await userEvent.click(
      screen.getByRole('combobox', {
        name: selectLabel,
      })
    );
    await userEvent.selectOptions(
      screen.getByRole('listbox', {
        name: selectLabel,
      }),
      screen.getByRole('option', {
        name: option,
      })
    );
  };

  it('should show only the available browsers for the selected device type', async () => {
    render(<InstructionsContainer />);

    await userEvent.click(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    );
    const browserOptionsForLaptop = within(
      screen.getByRole('listbox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    ).getAllByRole('option');

    expect(browserOptionsForLaptop).toHaveLength(1);
    expect(browserOptionsForLaptop[0]).toHaveTextContent(Browser.GOOGLE_CHROME);

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      'HowToInstall.Instructions.ANDROID_AND_TABLET_OPTION'
    );

    await userEvent.click(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    );
    const browserOptionsForMobile = within(
      screen.getByRole('listbox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    ).getAllByRole('option');

    expect(browserOptionsForMobile).toHaveLength(3);
    expect(browserOptionsForMobile[0]).toHaveTextContent(Browser.GOOGLE_CHROME);
    expect(browserOptionsForMobile[1]).toHaveTextContent(
      Browser.MOZILLA_FIREFOX
    );
    expect(browserOptionsForMobile[2]).toHaveTextContent(
      Browser.SAMSUNG_INTERNET
    );
  });

  it('shows the correct installation gif and steps when switching devices and browsers', async () => {
    render(<InstructionsContainer />);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_laptop_chrome/
    );
    expect(
      screen.getByText('HowToInstall.Instructions.STEP_1_LAPTOP_GOOGLE_CHROME')
    ).toBeVisible();
    expect(
      screen.getByText('HowToInstall.Instructions.STEP_2_LAPTOP_GOOGLE_CHROME')
    ).toBeVisible();

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      'HowToInstall.Instructions.ANDROID_AND_TABLET_OPTION'
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_chrome/
    );
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_1_ANDROID_AND_TABLET_GOOGLE_CHROME'
      )
    ).toBeVisible();
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_2_ANDROID_AND_TABLET_GOOGLE_CHROME'
      )
    ).toBeVisible();

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      Browser.MOZILLA_FIREFOX
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_firefox/
    );
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_1_ANDROID_AND_TABLET_MOZILLA_FIREFOX'
      )
    ).toBeVisible();
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_2_ANDROID_AND_TABLET_MOZILLA_FIREFOX'
      )
    ).toBeVisible();

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      Browser.SAMSUNG_INTERNET
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_samsung/
    );
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_1_ANDROID_AND_TABLET_SAMSUNG_INTERNET'
      )
    ).toBeVisible();
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_2_ANDROID_AND_TABLET_SAMSUNG_INTERNET'
      )
    ).toBeVisible();

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      'HowToInstall.Instructions.IPHONE_AND_IPAD_OPTION'
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_iphone_safari/
    );
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_1_IPHONE_AND_IPAD_SAFARI'
      )
    ).toBeVisible();
    expect(
      screen.getByText(
        'HowToInstall.Instructions.STEP_2_IPHONE_AND_IPAD_SAFARI'
      )
    ).toBeVisible();
  });

  it('should fallback to first available browser when switching device and another unsupported browser is selected', async () => {
    render(<InstructionsContainer />);

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      'HowToInstall.Instructions.ANDROID_AND_TABLET_OPTION'
    );

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      Browser.MOZILLA_FIREFOX
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_firefox/
    );

    await selectOptionFromDropdown(
      'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      'HowToInstall.Instructions.IPHONE_AND_IPAD_OPTION'
    );

    expect(
      within(
        screen.getByRole('combobox', {
          name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
        }) as HTMLSelectElement
      ).getByText(Browser.SAFARI)
    ).toBeVisible();
    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_iphone_safari/
    );
  });
});
