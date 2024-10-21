import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Option } from '../select/Select';
import styles from './SelectMui.module.css';

export interface SelectMuiProps {
  onChange: (newOption: string) => void;
  selectedOption: string;
  options: Option[];
  label: string;
  isInitiallyOpen?: boolean;
}

const SelectMui: React.FC<SelectMuiProps> = ({
  onChange,
  selectedOption,
  options,
  label,
  isInitiallyOpen = false,
}) => (
  <FormControl fullWidth>
    <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-select-label`}
      id={`${label}-select`}
      value={selectedOption}
      label={label}
      onChange={(event: SelectChangeEvent) =>
        onChange(event.target.value as string)
      }
      className={styles.select}
      defaultOpen={isInitiallyOpen}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.text}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectMui;
