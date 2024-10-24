import React from 'react';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Option } from '../select/Select';
import styles from './SelectMui.module.css';

export interface OptionsGroup {
  label: string;
  options: Option[];
}

export interface SelectMuiProps {
  onChange: (newOption: string) => void;
  selectedOption: string;
  options: OptionsGroup[] | Option[];
  label: string;
  isInitiallyOpen?: boolean;
}

const SelectMui: React.FC<SelectMuiProps> = ({
  onChange,
  selectedOption,
  options,
  label,
  isInitiallyOpen = false,
}) => {
  const areOptionsGrouped = (options[0] as OptionsGroup).label !== undefined;

  const renderSelectGroup = (group: OptionsGroup) => {
    const optionsForGroup = group.options.map((p) => (
      <MenuItem key={p.value} value={p.value}>
        {p.text}
      </MenuItem>
    ));

    return [
      <ListSubheader key={group.label}>{group.label}</ListSubheader>,
      ...optionsForGroup,
    ];
  };

  return (
    <FormControl size="small" fullWidth variant="filled">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        id={`${label}-select`}
        labelId={`${label}-select-label`}
        label={label}
        value={selectedOption}
        onChange={(event: SelectChangeEvent) =>
          onChange(event.target.value as string)
        }
        className={styles.select}
        defaultOpen={isInitiallyOpen}
        MenuProps={{ sx: { maxHeight: '60vh' } }}
      >
        {areOptionsGrouped
          ? (options as OptionsGroup[]).map((group) => renderSelectGroup(group))
          : (options as Option[]).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
};

export default SelectMui;
