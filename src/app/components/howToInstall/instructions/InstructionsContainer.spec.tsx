import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstructionsContainer from './InstructionsContainer';

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
});
