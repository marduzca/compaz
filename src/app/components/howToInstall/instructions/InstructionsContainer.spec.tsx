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
      name: Browser.SAFARI,
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

  it('should fallback to Chrome browser when another browser selected and switching from device from mobile to laptop', async () => {
    render(<InstructionsContainer />);

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.BROWSER_SELECTOR_LABEL',
      }),
      Browser.SAFARI
    );

    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: 'HowToInstall.Instructions.DEVICE_SELECTOR_LABEL',
      }),
      'HowToInstall.Instructions.LAPTOP_OPTION'
    );

    expect(
      (
        screen.getByRole('option', {
          name: Browser.GOOGLE_CHROME,
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

    expect(browserOptionsForMobile).toHaveLength(3);
    expect(browserOptionsForMobile[0]).toHaveValue('Google Chrome');
    expect(browserOptionsForMobile[1]).toHaveValue('Safari');
    expect(browserOptionsForMobile[2]).toHaveValue('Mozilla Firefox');

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
