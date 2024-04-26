/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import ArrowUpIcon from '../../../static/svg/chevron_up.svg?react';
import ArrowDownIcon from '../../../static/svg/chevron_down.svg?react';
import ClearIcon from '../../../static/svg/close.svg?react';
import styles from './Combobox.module.css';

export interface Option {
  value: string;
  text: string;
}

interface ComboboxProps {
  name: string;
  placeholder: string;
  options: Option[];
  inputValue: string;
  onChange: (inputValue: string) => void;
  toggleButtonTitle: string;
  clearButtonTitle: string;
  validationError?: boolean;
  required?: boolean;
  onClearButtonClick: (inputName: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  validationError = false,
  required = false,
  name,
  placeholder,
  options,
  inputValue,
  onChange,
  toggleButtonTitle,
  clearButtonTitle,
  onClearButtonClick,
}) => {
  const [inputOptions, setInputOptions] = useState(options);
  const {
    isOpen,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    openMenu,
    highlightedIndex,
    setInputValue,
  } = useCombobox({
    initialInputValue: inputValue || '',
    items: inputOptions,
    itemToString: (option) => (option ? option.text : ''),
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setInputOptions(filterOptions(options, inputValue));
        onChange(inputValue);
      } else {
        setInputOptions(options);
        onChange('');
      }
    },
  });

  const filterOptions = (options: Option[], filterValue: string) =>
    options.filter((option) =>
      option.text.toLowerCase().includes(filterValue.toLowerCase()),
    );

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue, setInputValue]);

  useEffect(() => {
    setInputOptions(filterOptions(options, inputValue));
  }, [
    validationError,
    required,
    name,
    placeholder,
    options,
    inputValue,
    onChange,
    toggleButtonTitle,
    clearButtonTitle,
    onClearButtonClick,
    setInputOptions,
  ]);

  return (
    <div
      className={`${styles.wrapper} ${
        validationError ? styles.withValidationError : ''
      } ${isOpen && inputOptions.length > 0 ? styles.open : ''}`}
    >
      <div
        className={`${styles.combobox} ${
          inputValue && inputValue !== '' ? styles.selected : ''
        }`}
      >
        <input
          required={required}
          name={name}
          spellCheck={false}
          {...getInputProps({
            ...getInputProps(),
            onFocus: () => {
              if (!isOpen) {
                openMenu();
              }
            },
          })}
        />
        <label htmlFor={name} {...getLabelProps()}>
          {placeholder}
        </label>
        {inputValue ? (
          <button
            type="button"
            title={clearButtonTitle}
            aria-label={clearButtonTitle}
            className={styles.clearButton}
            onClick={() => {
              onClearButtonClick(name);
            }}
          >
            <ClearIcon />
          </button>
        ) : (
          <button
            type="button"
            title={toggleButtonTitle}
            className={styles.toggleButton}
            {...getToggleButtonProps()}
          >
            {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
      </div>
      <ul {...getMenuProps()} className={styles.optionList}>
        {isOpen &&
          inputOptions.map((option, index) => (
            <li
              className={`${styles.option} ${
                highlightedIndex === index ? styles.highlighted : ''
              }`}
              key={option.value}
              {...getItemProps({ item: option, index })}
            >
              {option.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Combobox;
