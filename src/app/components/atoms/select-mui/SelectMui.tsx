import React, { useId } from 'react';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export interface SelectOption {
  value: string;
  text: string;
}

export interface OptionsGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectMuiProps {
  onChange: (newOption: string) => void;
  selectedOption: string;
  options: ReadonlyArray<SelectOption | OptionsGroup>;
  label: string;
  isInitiallyOpen?: boolean;
}

const isGroup = (item: SelectOption | OptionsGroup): item is OptionsGroup =>
  'options' in item;

const SelectMui: React.FC<SelectMuiProps> = ({
  onChange,
  selectedOption,
  options,
  label,
  isInitiallyOpen = false,
}) => {
  const id = useId();
  const labelId = `${id}-label`;

  const renderOption = (option: SelectOption) => (
    <MenuItem key={option.value} value={option.value}>
      {option.text}
    </MenuItem>
  );

  return (
    <FormControl size="small" fullWidth variant="filled">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        id={id}
        labelId={labelId}
        label={label}
        value={selectedOption}
        onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
        defaultOpen={isInitiallyOpen}
        MenuProps={{ sx: { maxHeight: '60vh' } }}
      >
        {options.flatMap((item) =>
          isGroup(item)
            ? [
                <ListSubheader key={item.label}>{item.label}</ListSubheader>,
                ...item.options.map(renderOption),
              ]
            : [renderOption(item)],
        )}
      </Select>
    </FormControl>
  );
};

export default SelectMui;
