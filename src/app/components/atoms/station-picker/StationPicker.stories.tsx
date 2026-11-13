import React from 'react';
import { Meta } from '@storybook/react-vite';
import StationPicker from './StationPicker';
import { LineColor } from '../../domain';

export default {
  component: StationPicker,
  title: 'Atoms / StationPicker',
} satisfies Meta;

const groups = [
  {
    line: LineColor.RED,
    stations: [
      { id: 'irpavi', name: 'Irpavi' },
      { id: 'central', name: 'Estación Central' },
    ],
  },
  {
    line: LineColor.YELLOW,
    stations: [
      { id: 'central', name: 'Estación Central' },
      { id: 'libertador', name: 'Libertador' },
    ],
  },
];

const guaranteedSize = (child: React.ReactNode): React.ReactNode => (
  <div style={{ width: '360px', minHeight: '420px' }}>{child}</div>
);

export const OpenInBrowseMode: React.FC = () =>
  guaranteedSize(
    <StationPicker
      isInitiallyOpen
      label="Origin"
      groups={groups}
      selectedStationId={undefined}
      onSelect={() => ({})}
      onClear={() => ({})}
      clearText="Clear"
    />,
  );

export const WithSelectedStation: React.FC = () =>
  guaranteedSize(
    <StationPicker
      label="Origin"
      groups={groups}
      selectedStationId="central"
      onSelect={() => ({})}
      onClear={() => ({})}
      clearText="Clear"
    />,
  );

export const WithError: React.FC = () =>
  guaranteedSize(
    <StationPicker
      label="Origin"
      groups={groups}
      selectedStationId={undefined}
      onSelect={() => ({})}
      onClear={() => ({})}
      clearText="Clear"
      errorMessage="Non-existent station"
    />,
  );
