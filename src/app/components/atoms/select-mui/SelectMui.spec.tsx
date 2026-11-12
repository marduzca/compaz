import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectMui from './SelectMui';

describe('SelectMui', () => {
  const devices = [
    { value: 'laptop', text: 'Laptop' },
    { value: 'android', text: 'Android' },
  ];

  it('SHOULD render without error WHEN the options list is empty', () => {
    render(
      <SelectMui
        label="Device"
        selectedOption=""
        onChange={vi.fn()}
        options={[]}
      />,
    );

    expect(screen.getByRole('combobox', { name: 'Device' })).toBeVisible();
  });

  it('SHOULD associate each select with its own label WHEN labels contain spaces or are duplicated', () => {
    render(
      <>
        <SelectMui
          label="Origin station"
          selectedOption=""
          onChange={vi.fn()}
          options={devices}
        />
        <SelectMui
          label="Origin station"
          selectedOption=""
          onChange={vi.fn()}
          options={devices}
        />
      </>,
    );

    const [first, second] = screen.getAllByRole('combobox', {
      name: 'Origin station',
    });
    expect(first).not.toBe(second);
    expect(first!.getAttribute('aria-labelledby')).not.toBe(
      second!.getAttribute('aria-labelledby'),
    );
  });

  it('SHOULD call onChange with the chosen value WHEN an option is clicked', async () => {
    const onChange = vi.fn();
    render(
      <SelectMui
        label="Device"
        selectedOption="laptop"
        onChange={onChange}
        options={devices}
      />,
    );

    await userEvent.click(screen.getByRole('combobox', { name: 'Device' }));
    await userEvent.click(screen.getByRole('option', { name: 'Android' }));

    expect(onChange).toHaveBeenCalledWith('android');
  });

  it('SHOULD render group headers and their options WHEN options are grouped', async () => {
    render(
      <SelectMui
        label="Origin"
        selectedOption=""
        onChange={vi.fn()}
        options={[{ label: 'Red', options: devices }]}
      />,
    );

    await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));

    expect(screen.getByText('Red')).toBeVisible();
    expect(screen.getByRole('option', { name: 'Laptop' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Android' })).toBeVisible();
  });
});
