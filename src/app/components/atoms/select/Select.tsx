/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/role-has-required-aria-props */
import React from 'react';
import { useSelect } from 'downshift';
import ArrowUpIcon from '../../../static/svg/chevron_up.svg?react';
import ArrowDownIcon from '../../../static/svg/chevron_down.svg?react';
import styles from './Select.module.css';

export interface Option {
  value: string;
  text: string;
}

export interface SelectProps {
  onChange: (newOption: Option) => void;
  selectedOption: Option;
  options: Option[];
  labelId?: string;
  ariaLabel?: string;
}

const Select: React.FC<SelectProps> = ({
  labelId = undefined,
  ariaLabel = undefined,
  onChange,
  selectedOption,
  options,
}) => {
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    initialSelectedItem: selectedOption,
    items: options,
    itemToString: (item) => (item ? item.text : ''),
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        onChange(newSelectedItem);
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <div
        {...getToggleButtonProps()}
        role="combobox"
        className={styles.toggleButton}
        tabIndex={0}
        aria-labelledby={labelId}
        aria-label={ariaLabel} // aria-labelledby is higher ranked than aria-label, so aria-label is only for exceptions like when no visible label is present or for tests
      >
        <span>{selectedOption.text}</span>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      <ul
        {...getMenuProps()}
        aria-labelledby={labelId}
        aria-label={ariaLabel} // aria-labelledby is higher ranked than aria-label, so aria-label is only for exceptions like when no visible label is present or for tests
        className={styles.optionsList}
      >
        {isOpen &&
          options.map((item, index) => (
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
