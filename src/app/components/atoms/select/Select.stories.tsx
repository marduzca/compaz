import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Select, { Option } from './Select';

export default {
  component: Select,
  title: 'Atoms / Select',
} satisfies Meta;

export const BasicInNormalState: React.FC = () => {
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

  return (
    <Select
      options={books}
      onChange={actions('onChange').onChange}
      selectedOption={books[0]}
      ariaLabel="randomLabel"
    />
  );
};
