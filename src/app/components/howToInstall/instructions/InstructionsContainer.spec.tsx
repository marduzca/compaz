import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsContainer, { Browser } from './InstructionsContainer';

describe('InstructionsContainer', () => {
  it('allows to select a device from the device selector', async () => {
    render(<InstructionsContainer />);

    const laptopOption = screen.getByRole('option', {
      name: 'HowToInstall.Instructions.LAPTOP_OPTION',
    }) as HTMLOptionElement;

    expect(laptopOption.selected).toBeFalsy();

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
      laptopOption
    );

    expect(laptopOption.selected).toBeTruthy();
  });

  it('allows to select a browser from the browser selector', async () => {
    render(<InstructionsContainer />);

    const safariOption = screen.getByRole('option', {
      name: Browser.MOZILLA_FIREFOX,
    }) as HTMLOptionElement;

    expect(safariOption.selected).toBeFalsy();

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
      safariOption
    );

    expect(safariOption.selected).toBeTruthy();
  });

  it('should fallback to first available browser when switching device and another unsupported browser is selected', async () => {
    render(<InstructionsContainer />);

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
      Browser.MOZILLA_FIREFOX
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
  });

  it('should show only the available browsers for the selected device type', async () => {
    render(<InstructionsContainer />);

    const browserOptionsForMobile = within(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      })
    ).getAllByRole('option');

    expect(browserOptionsForMobile).toHaveLength(2);
    expect(browserOptionsForMobile[0]).toHaveValue('Google Chrome');
    expect(browserOptionsForMobile[1]).toHaveValue('Mozilla Firefox');

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
    expect(browserOptionsForLaptop[0]).toHaveValue('Google Chrome');
  });
});
