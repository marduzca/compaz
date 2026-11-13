import React, { useMemo } from 'react';
import { Autocomplete, ListSubheader, TextField } from '@mui/material';
import LineBadge from '../lineBadge/LineBadge';
import { LineColor, Station } from '../../domain';

export type StationOption = Pick<Station, 'id' | 'name'>;

export interface StationsOfLine {
  line: LineColor;
  stations: StationOption[];
}

interface StationPickerProps {
  label: string;
  groups: StationsOfLine[];
  selectedStationId: string | undefined;
  onSelect: (stationId: string) => void;
  onClear: () => void;
  clearText: string;
  errorMessage?: string | undefined;
  isInitiallyOpen?: boolean;
}

interface GroupedOption extends StationOption {
  line: LineColor;
}

const StationPicker: React.FC<StationPickerProps> = ({
  label,
  groups,
  selectedStationId,
  onSelect,
  onClear,
  clearText,
  errorMessage,
  isInitiallyOpen = false,
}) => {
  const options = useMemo<GroupedOption[]>(
    () =>
      groups.flatMap(({ line, stations }) =>
        stations.map((station) => ({ ...station, line })),
      ),
    [groups],
  );

  const selectedOption =
    options.find((option) => option.id === selectedStationId) ?? null;

  return (
    <Autocomplete
      size="small"
      fullWidth
      {...(isInitiallyOpen ? { open: true } : {})}
      options={options}
      groupBy={(option) => option.line}
      getOptionKey={(option) => `${option.line}-${option.id}`}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedOption}
      clearText={clearText}
      onChange={(_event, newValue) => {
        if (newValue) {
          onSelect(newValue.id);
        } else {
          onClear();
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          error={Boolean(errorMessage)}
          helperText={errorMessage}
        />
      )}
      renderGroup={({ key, group, children }) => {
        const headerId = `${key}-header`;
        return (
          <li key={key}>
            <ListSubheader
              component="div"
              id={headerId}
              sx={{ bgcolor: 'background.paper' }}
            >
              <LineBadge line={group as LineColor} size="header" />
            </ListSubheader>
            <ul
              role="group"
              aria-labelledby={headerId}
              style={{ padding: 0, listStyle: 'none' }}
            >
              {children}
            </ul>
          </li>
        );
      }}
    />
  );
};

export default StationPicker;
