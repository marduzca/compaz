/* eslint-disable react/jsx-props-no-spreading */
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import { ReactComponent as UpIcon } from '../../../static/img/arrow_up.svg';
import { ReactComponent as DownIcon } from '../../../static/img/arrow_down.svg';
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
  inputOnKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  validationError?: boolean;
}

const Combobox: React.FC<ComboboxProps> = (props) => {
  const [inputOptions, setInputOptions] = useState(props.options);
  const {
    isOpen,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    highlightedIndex,
    setInputValue,
  } = useCombobox({
    initialInputValue: props.inputValue || '',
    items: inputOptions,
    itemToString: (option) => (option ? option.text : ''),
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setInputOptions(filterOptions(props.options, inputValue));
        props.onChange(inputValue);
      } else {
        setInputOptions(props.options);
        props.onChange('');
      }
    },
  });

  const filterOptions = (options: Option[], filterValue: string) =>
    options.filter((option) =>
      option.text.toLowerCase().includes(filterValue.toLowerCase())
    );

  useEffect(() => {
    setInputValue(props.inputValue);
  }, [props.inputValue, setInputValue]);

  useEffect(() => {
    setInputOptions(filterOptions(props.options, props.inputValue));
  }, [props, setInputOptions]);

  return (
    <div
      className={`${styles.wrapper} ${
        props.validationError ? styles.withValidationError : ''
      } ${isOpen && inputOptions.length > 0 ? styles.open : ''}`}
    >
      <div
        {...getComboboxProps()}
        className={`${styles.combobox} ${
          props.inputValue && props.inputValue !== '' ? styles.selected : ''
        }`}
      >
        <input
          name={props.name}
          {...getInputProps({
            onKeyDown: (e) => {
              if (props.inputOnKeyDown) {
                props.inputOnKeyDown(e);
              }
            },
          })}
          onClick={(e) => {
            if (!isOpen) getToggleButtonProps().onClick(e);
          }}
          className={styles.input}
        />
        <label htmlFor={props.name} {...getLabelProps()}>
          {props.placeholder}
        </label>
        <button
          type="button"
          aria-label="toggle-options"
          {...getToggleButtonProps()}
        >
          {isOpen ? (
            <UpIcon className={styles.toggleButton} />
          ) : (
            <DownIcon className={styles.toggleButton} />
          )}
        </button>
      </div>
      <ul {...getMenuProps()} className={styles.optionList}>
        {isOpen &&
          inputOptions.map((option, index) => (
            <li
              className={`${styles.option} ${
                highlightedIndex === index ? styles.highlighted : ''
              }`}
              key={`${option.value}`}
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
