import React, { useState } from 'react';
import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select, { Option } from './Select';

describe('Select', () => {
  const books: Option[] = [
    { value: 'To Kill a Mockingbird', text: 'To Kill a Mockingbird' },
    { value: 'War and Peace', text: 'War and Peace' },
    { value: 'The Idiot', text: 'The Idiot' },
    { value: 'A Picture of Dorian Gray', text: 'A Picture of Dorian Gray' },
    { value: '1984', text: '1984' },
    { value: 'Pride and Prejudice', text: 'Pride and Prejudice' },
    { value: 'Meditations', text: 'Meditations' },
    { value: 'The Brothers Karamazov', text: 'The Brothers Karamazov' },
    { value: 'Anna Karenina', text: 'Anna Karenina' },
    { value: 'Crime and Punishment', text: 'Crime and Punishment' },
  ];

  it('shows options when clicked and closes them when clicking again', async () => {
    render(
      <Select
        onChange={() => {}}
        selectedOption={books[0]}
        options={books}
        ariaLabel="Books combobox"
      />
    );

    expect(screen.queryAllByRole('option')).toHaveLength(0);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Books combobox',
        })
      );
    });

    expect(screen.queryAllByRole('option')).toHaveLength(10);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Books combobox',
        })
      );
    });

    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('shows selected value when clicked and closes the options', async () => {
    const SelectWrapper: React.FC = () => {
      const [selectedOption, setSelectedOption] = useState<Option>(books[0]);

      return (
        <Select
          onChange={(newOption) => {
            setSelectedOption(newOption);
          }}
          selectedOption={selectedOption}
          options={books}
          ariaLabel="Books combobox"
        />
      );
    };

    render(<SelectWrapper />);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Books combobox',
        })
      );
    });

    expect(screen.queryAllByRole('option')).toHaveLength(10);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('option', {
          name: 'A Picture of Dorian Gray',
        })
      );
    });

    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.queryByText('A Picture of Dorian Gray')).toBeVisible();
  });

  it('triggers onChange handler when selecting a new option', async () => {
    const handlerFn = vi.fn();
    render(
      <Select
        onChange={handlerFn}
        selectedOption={books[0]}
        options={books}
        ariaLabel="Books combobox"
      />
    );

    await act(async () => {
      await userEvent.click(
        screen.getByRole('combobox', {
          name: 'Books combobox',
        })
      );
    });
    await act(async () => {
      await userEvent.selectOptions(
        screen.getByRole('listbox', {
          name: 'Books combobox',
        }),
        screen.getByRole('option', {
          name: 'A Picture of Dorian Gray',
        })
      );
    });

    expect(handlerFn).toHaveBeenCalledTimes(1);
    expect(handlerFn).toHaveBeenCalledWith(books[3]);
  });
});
