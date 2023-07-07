import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox, { Option } from './Combobox';

const WrappedComboBox: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('');

  return (
    <Combobox
      name="some-dropdown"
      onChange={(newValue) => setCurrentValue(newValue)}
      inputValue={currentValue}
      options={
        [
          { value: '1', text: 'opt 1' },
          { value: '2', text: 'opt 2' },
          { value: '3', text: 'opt 3' },
          { value: '4', text: 'opt 4' },
          { value: '5', text: 'opt 5' },
          { value: '6', text: 'opt 6' },
          { value: '7', text: 'opt 7' },
          { value: '8', text: 'opt 8' },
          { value: '9', text: 'opt 9' },
          { value: '10', text: 'opt 10' },
          { value: '11', text: 'opt 11' },
          { value: '12', text: 'opt 12' },
          { value: '13', text: 'opt 13' },
          { value: '14', text: 'opt 14' },
          { value: '15', text: 'opt 15' },
          { value: '16', text: 'opt 16' },
          { value: '17', text: 'opt 17' },
          { value: '18', text: 'opt 18' },
          { value: '19', text: 'opt 19' },
          { value: '20', text: 'opt 20' },
        ] as Option[]
      }
      placeholder="placeholder"
      toggleButtonTitle="toggleButtonTitle"
      clearButtonTitle="clearButtonTitle"
      onClearButtonClick={() => {}}
    />
  );
};

describe('ComboBox', () => {
  beforeEach(() => {
    render(<WrappedComboBox />);
  });

  describe('visible functionality', () => {
    it('initially closed and shows placeholder', () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();
    });

    it('shows options when focused', async () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('button'));
      });

      expect(screen.getByRole('option', { name: 'opt 1' })).toBeVisible();
    });

    it('shows options when toggle button clicked', async () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('button'));
      });

      expect(screen.getByRole('option', { name: 'opt 1' })).toBeVisible();
    });

    it('closes when clicking on toggle button again', async () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('button'));
      });
      expect(screen.getByRole('option', { name: 'opt 1' })).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('button'));
      });
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
    });

    it('shows selected value and when clicked closes the options', async () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('button'));
      });
      expect(screen.getByRole('option', { name: 'opt 1' })).toBeVisible();
      expect(screen.getByRole('option', { name: 'opt 2' })).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('option', { name: 'opt 1' }));
      });
      expect(
        screen.queryByRole('option', { name: 'opt 2' }),
      ).not.toBeInTheDocument();

      expect(
        screen.getByRole('combobox', { name: 'placeholder' }),
      ).toHaveAttribute('value', 'opt 1');
      expect(screen.getByText('placeholder')).toBeVisible();
    });
  });

  describe('with input filtering', () => {
    it('only shows options that match the input value', async () => {
      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(screen.getByText('placeholder')).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByText('placeholder'));
      });

      fireEvent.change(screen.getByRole('combobox', { name: 'placeholder' }), {
        target: { value: 'opt 2' },
      });

      expect(
        screen.queryByRole('option', { name: 'opt 1' }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: 'opt 12' }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'opt 2' })).toBeVisible();
      expect(screen.getByRole('option', { name: 'opt 20' })).toBeVisible();

      await act(async () => {
        await userEvent.click(screen.getByRole('option', { name: 'opt 2' }));
      });

      expect(
        screen.queryByRole('option', { name: 'opt 2' }),
      ).not.toBeInTheDocument();

      expect(
        screen.getByRole('combobox', { name: 'placeholder' }),
      ).toHaveAttribute('value', 'opt 2');
    });
  });
});
