import React, { useState } from 'react';
import Instructions from './Instructions';

export enum Device {
  SMARTPHONE_TABLET = 'SMARTPHONE_TABLET',
  LAPTOP = 'LAPTOP',
}

const InstructionsContainer: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device>(
    Device.SMARTPHONE_TABLET
  );

  const handleDeviceSelection = (newDevice: string) => {
    const typedDeviceString = newDevice as keyof typeof Device;
    setSelectedDevice(Device[typedDeviceString]);
  };

  return (
    <Instructions
      selectedDevice={selectedDevice.toString()}
      onDeviceSelection={handleDeviceSelection}
    />
  );
};

export default InstructionsContainer;
