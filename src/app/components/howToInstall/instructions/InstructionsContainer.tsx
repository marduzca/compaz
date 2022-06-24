import React, { useState } from 'react';
import Instructions from './Instructions';

export enum Device {
  SMARTPHONE_TABLET = 'SMARTPHONE_TABLET',
  LAPTOP = 'LAPTOP',
}

export enum Browser {
  GOOGLE_CHROME = 'Google Chrome',
  SAFARI = 'Safari',
  MOZILLA_FIREFOX = 'Mozilla Firefox',
}

type DeviceToBrowsersMap = {
  [device in Device]: Browser[];
};

const availableBrowsersForDevice: DeviceToBrowsersMap = {
  [Device.SMARTPHONE_TABLET]: [
    Browser.GOOGLE_CHROME,
    Browser.SAFARI,
    Browser.MOZILLA_FIREFOX,
  ],
  [Device.LAPTOP]: [Browser.GOOGLE_CHROME],
};

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
      selectedDevice={selectedDevice}
      onDeviceSelection={handleDeviceSelection}
      availableBrowsers={availableBrowsersForDevice[selectedDevice]}
    />
  );
};

export default InstructionsContainer;
