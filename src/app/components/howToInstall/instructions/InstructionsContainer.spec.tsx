import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsContainer, { Browser } from './InstructionsContainer';

describe('InstructionsContainer', () => {
  it('should show only the available browsers for the selected device type', async () => {
    render(<InstructionsContainer />);

    const browserOptionsForMobile = within(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    ).getAllByRole('option');

    expect(browserOptionsForMobile).toHaveLength(3);
    expect(browserOptionsForMobile[0]).toHaveValue(Browser.GOOGLE_CHROME);
    expect(browserOptionsForMobile[1]).toHaveValue(Browser.MOZILLA_FIREFOX);
    expect(browserOptionsForMobile[2]).toHaveValue(Browser.SAMSUNG_INTERNET);

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
      'HowToInstall.Instructions.LAPTOP_OPTION'
    );

    const browserOptionsForLaptop = within(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    ).getAllByRole('option');

    expect(browserOptionsForLaptop).toHaveLength(1);
    expect(browserOptionsForLaptop[0]).toHaveValue(Browser.GOOGLE_CHROME);
  });

  it('shows the correct installation gif and steps when switching devices and browsers', async () => {
    render(<InstructionsContainer />);

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

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
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

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
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

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
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

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
      'HowToInstall.Instructions.LAPTOP_OPTION'
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_laptop_chrome/
    );
    expect(
      screen.getByText('HowToInstall.Instructions.STEP_1_LAPTOP_GOOGLE_CHROME')
    ).toBeVisible();
    expect(
      screen.getByText('HowToInstall.Instructions.STEP_2_LAPTOP_GOOGLE_CHROME')
    ).toBeVisible();
  });

  it('should fallback to first available browser when switching device and another unsupported browser is selected', async () => {
    render(<InstructionsContainer />);

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
      Browser.MOZILLA_FIREFOX
    );

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_android_firefox/
    );

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
      'HowToInstall.Instructions.IPHONE_AND_IPAD_OPTION'
    );

    expect(
      (
        screen.getByRole('option', {
          name: Browser.SAFARI,
        }) as HTMLOptionElement
      ).selected
    ).toBeTruthy();
    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      /install_iphone_safari/
    );
  });
});
