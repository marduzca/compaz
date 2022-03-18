import React from 'react';
import styles from './TextBox.module.css';

interface TextBoxProps {
  value: string;
  onChange: (input: string) => void;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

const TextBox: React.FC<TextBoxProps> = (props) => (
  <div className={`${styles.textBox} ${!!props.value && styles.notEmpty}`}>
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      spellCheck={false}
      required={props.required}
    />
    <label htmlFor={props.name}>{props.label}</label>
  </div>
);

TextBox.defaultProps = {
  required: false,
  type: 'text',
};

export default TextBox;
