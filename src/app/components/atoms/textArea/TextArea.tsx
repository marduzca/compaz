import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
  value: string;
  onChange: (input: string) => void;
  label: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  required = false,
  value,
  onChange,
  label,
}) => (
  <textarea
    name={label}
    aria-label={label}
    placeholder={label}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    spellCheck={false}
    required={required}
    className={styles.textArea}
  />
);

export default TextArea;
