import React from 'react';
import { Meta } from '@storybook/react-vite';
import Select, { Option } from './select/Select';
import SelectMui from './select-mui/SelectMui';
import Combobox from './combobox/Combobox';

export default {
  title: 'Atoms / Compare old vs new inputs',
  parameters: {
    chromatic: { viewports: [360] },
  },
} satisfies Meta;

const SideBySide: React.FC<{
  legacy: React.ReactNode;
  mui: React.ReactNode;
}> = ({ legacy, mui }) => (
  <div style={{ width: '360px' }}>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }} data-testid="legacy">
        <p style={{ margin: '0 0 4px', fontSize: '12px' }}>Old</p>
        {legacy}
      </div>
      <div style={{ flex: 1, minWidth: 0 }} data-testid="mui">
        <p style={{ margin: '0 0 4px', fontSize: '12px' }}>New (MUI)</p>
        {mui}
      </div>
    </div>
  </div>
);

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div style={{ minHeight: '420px' }}>{child}</div>
);

const devices: Option[] = [
  { value: 'laptop', text: 'Laptop' },
  { value: 'android', text: 'Android' },
  { value: 'iphone', text: 'iPhone' },
];

export const InstructionsDeviceSelect: React.FC = () =>
  guaranteedSize(
    <SideBySide
      legacy={
        <Select
          ariaLabel="Device"
          onChange={() => ({})}
          selectedOption={devices[0]!}
          options={devices}
        />
      }
      mui={
        <SelectMui
          label="Device"
          selectedOption="laptop"
          onChange={() => ({})}
          options={devices}
        />
      }
    />,
  );

const browsers: Option[] = [
  { value: 'Chrome', text: 'Chrome' },
  { value: 'Safari', text: 'Safari' },
  { value: 'Firefox', text: 'Firefox' },
];

export const InstructionsBrowserSelect: React.FC = () =>
  guaranteedSize(
    <SideBySide
      legacy={
        <Select
          ariaLabel="Browser"
          onChange={() => ({})}
          selectedOption={browsers[0]!}
          options={browsers}
        />
      }
      mui={
        <SelectMui
          label="Browser"
          selectedOption="Chrome"
          onChange={() => ({})}
          options={browsers}
        />
      }
    />,
  );

const stations = [
  { id: 'irpavi', name: 'Irpavi', lines: ['red'] },
  { id: 'central', name: 'Estación Central', lines: ['red', 'yellow'] },
  { id: 'cementerio', name: 'Cementerio', lines: ['green'] },
  { id: 'libertador', name: 'Libertador', lines: ['yellow'] },
];

export const StationSelector: React.FC = () =>
  guaranteedSize(
    <SideBySide
      legacy={
        <Combobox
          isInitiallyOpen
          name="origin"
          placeholder="Origin"
          toggleButtonTitle="Toggle"
          clearButtonTitle="Clear"
          onClearButtonClick={() => ({})}
          onChange={() => ({})}
          inputValue=""
          options={stations.map((s) => ({
            value: s.id,
            text: s.name,
            lines: s.lines,
          }))}
        />
      }
      mui={
        <SelectMui
          isInitiallyOpen
          label="Origin"
          selectedOption=""
          onChange={() => ({})}
          options={['red', 'yellow', 'green'].map((line) => ({
            label: line,
            options: stations
              .filter((s) => s.lines.includes(line))
              .map((s) => ({ value: s.id, text: s.name })),
          }))}
        />
      }
    />,
  );
