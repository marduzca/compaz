/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import { ReactComponent as ArrowUpIcon } from '../../../../static/img/chevron_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../../static/img/chevron_down.svg';
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
  validationError?: boolean;
  arrowButtonTitle: string;
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
          onClick={(e) => {
            if (!isOpen) getToggleButtonProps().onClick(e);
          }}
          className={styles.input}
          {...getInputProps({})}
          spellCheck={false}
        />
        <label htmlFor={props.name} {...getLabelProps()}>
          {props.placeholder}
        </label>
        <button
          type="button"
          title={props.arrowButtonTitle}
          {...getToggleButtonProps()}
        >
          {isOpen ? (
            <ArrowUpIcon className={styles.toggleButton} />
          ) : (
            <ArrowDownIcon className={styles.toggleButton} />
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

Combobox.defaultProps = {
  validationError: false,
};

export default Combobox;