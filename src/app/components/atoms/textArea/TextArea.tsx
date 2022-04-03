import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
  value: string;
  onChange: (input: string) => void;
  label: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = (props) => (
  <textarea
    name={props.label}
    aria-label={props.label}
    placeholder={props.label}
    value={props.value}
    onChange={(event) => props.onChange(event.target.value)}
    spellCheck={false}
    required={props.required}
    className={styles.textArea}
  />
);

TextArea.defaultProps = {
  required: false,
};

export default TextArea;
