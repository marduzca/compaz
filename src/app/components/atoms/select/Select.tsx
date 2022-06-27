/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelect } from 'downshift';
import { ReactComponent as ArrowUpIcon } from '../../../static/svg/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../static/svg/chevron_down.svg';
import styles from './Select.module.css';

// Extract label
// Make fancy outline
// Max height?
// Mention selected option in button accessible name

export interface Option {
  value: string;
  text: string;
}

export interface SelectProps {
  onChange: (newOption: Option) => void;
  selectedOption: Option;
  options: Option[];
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    initialSelectedItem: props.selectedOption,
    items: props.options,
    itemToString: (item) => (item ? item.text : ''),
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        props.onChange(newSelectedItem);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label {...getLabelProps()}>Choose your favorite book:</label>
        <button
          {...getToggleButtonProps()}
          type="button"
          aria-label="toggle menu"
          className={styles.toggleButton}
        >
          <span>{props.selectedOption.text}</span>
          {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      <ul {...getMenuProps()} className={styles.optionsList}>
        {isOpen &&
          props.options.map((item, index) => (
            <li
              {...getItemProps({ item, index })}
              key={item.value}
              className={`${styles.option} ${
                highlightedIndex === index && styles.highlightedOption
              } ${selectedItem?.value === item.value && styles.selectedOption}`}
              aria-selected={selectedItem?.value === item.value}
            >
              <span>{item.text}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Select;
