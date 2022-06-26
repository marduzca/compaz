import React, { useState } from 'react';
import Instructions from './Instructions';
import useMediaQuery from '../../useMediaQuery';

export enum Device {
  ANDROID_AND_TABLET = 'ANDROID_AND_TABLET',
  IPHONE_AND_IPAD = 'IPHONE_AND_IPAD',
  LAPTOP = 'LAPTOP',
}

export enum Browser {
  GOOGLE_CHROME = 'Google Chrome',
  SAFARI = 'Safari',
  MOZILLA_FIREFOX = 'Mozilla Firefox',
  SAMSUNG_INTERNET = 'Samsung Internet',
}

type DeviceToBrowsersMap = {
  [device in Device]: Browser[];
};

const availableBrowsersForDevice: DeviceToBrowsersMap = {
  [Device.ANDROID_AND_TABLET]: [
    Browser.GOOGLE_CHROME,
    Browser.MOZILLA_FIREFOX,
    Browser.SAMSUNG_INTERNET,
  ],
  [Device.IPHONE_AND_IPAD]: [Browser.SAFARI],
  [Device.LAPTOP]: [Browser.GOOGLE_CHROME],
};

const InstructionsContainer: React.FC = () => {
  const isMobile = useMediaQuery();

  const [selectedDevice, setSelectedDevice] = useState<Device>(
    isMobile ? Device.ANDROID_AND_TABLET : Device.LAPTOP
  );
  const [selectedBrowser, setSelectedBrowser] = useState<Browser>(
    Browser.GOOGLE_CHROME
  );

  const handleDeviceSelection = (newDevice: string) => {
    const typedDeviceString = newDevice as keyof typeof Device;
    setSelectedDevice(Device[typedDeviceString]);

    if (
      !availableBrowsersForDevice[Device[typedDeviceString]].includes(
        selectedBrowser
      )
    ) {
      setSelectedBrowser(
        availableBrowsersForDevice[Device[typedDeviceString]][0]
      );
    }
  };

  const handleBrowserSelection = (newBrowser: string) => {
    const typedBrowserString = newBrowser
      .toLocaleUpperCase()
      .replace(/ /g, '_') as keyof typeof Browser;

    setSelectedBrowser(Browser[typedBrowserString]);
  };

  return (
    <Instructions
      selectedDevice={selectedDevice}
      onDeviceSelection={handleDeviceSelection}
      selectedBrowser={selectedBrowser}
      onBrowserSelection={handleBrowserSelection}
      availableBrowsers={availableBrowsersForDevice[selectedDevice]}
    />
  );
};

export default InstructionsContainer;
