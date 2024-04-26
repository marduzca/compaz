import React from 'react';
import styles from './TextBox.module.css';

interface TextBoxProps {
  value: string;
  onChange: (input: string) => void;
  label: string;
  type?: string;
  required?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  required = false,
  type = 'text',
  value,
  onChange,
  label,
}) => (
  <div className={`${styles.textBox} ${!!value && styles.notEmpty}`}>
    <input
      id={label}
      name={label}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
      required={required}
    />
    <label htmlFor={label}>{label}</label>
  </div>
);

export default TextBox;
