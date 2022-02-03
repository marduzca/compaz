import React, { useEffect, useState } from 'react';
import StationsSelector, { ORIGIN } from './StationsSelector';
import { useNavigation } from '../../../providers/NavigationProvider';
import { useFirebase } from '../../../providers/FirebaseProvider';

interface StationsSelectorContainerProps {
  showOriginMissingError: boolean;
  showDestinationMissingError: boolean;
}

const StationsSelectorContainer: React.FC<StationsSelectorContainerProps> = (
  props
) => {
  const { stations } = useFirebase();
  const {
    origin,
    destination,
    setOriginStation,
    setDestinationStation,
    generateStationsMap,
  } = useNavigation();

  const [originInputValue, setOriginInputValue] = useState<string>('');
  const [destinationInputValue, setDestinationInputValue] =
    useState<string>('');
  const [showOriginValidationError, setShowOriginValidationError] =
    useState<boolean>(false);
  const [showDestinationValidationError, setShowDestinationValidationError] =
    useState<boolean>(false);

  useEffect(() => {
    generateStationsMap(stations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations]);

  const shouldShowValidationError = (
    filterOutValue: string | undefined = '',
    searchTerm: string
  ): boolean =>
    !stations
      .filter((station) => station.name !== filterOutValue)
      .some((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleOriginChange = (newOrigin: string) => {
    setOriginInputValue(newOrigin);
    setShowOriginValidationError(
      shouldShowValidationError(destination?.name, newOrigin)
    );

    const newOriginStation = stations.find(
      (station) => station.name === newOrigin
    );
    if (newOriginStation) {
      setOriginStation(newOriginStation);
    } else if (origin) {
      setOriginStation(undefined);
    }
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestinationInputValue(newDestination);
    setShowDestinationValidationError(
      shouldShowValidationError(origin?.name, newDestination)
    );

    const newDestinationStation = stations.find(
      (station) => station.name === newDestination
    );
    if (newDestinationStation) {
      setDestinationStation(newDestinationStation);
    } else if (destination) {
      setDestinationStation(undefined);
    }
  };

  const handleClearButtonClick = (inputName: string) => {
    if (inputName === ORIGIN) {
      setOriginInputValue('');
      setShowOriginValidationError(false);
      setOriginStation(undefined);
    } else {
      setDestinationInputValue('');
      setShowDestinationValidationError(false);
      setDestinationStation(undefined);
    }
  };

  const handleSwitcherClick = () => {
    setOriginStation(destination);
    setDestinationStation(origin);

    setOriginInputValue(destinationInputValue);
    setDestinationInputValue(originInputValue);
  };

  return (
    <StationsSelector
      originInputValue={originInputValue}
      destinationInputValue={destinationInputValue}
      onOriginChange={handleOriginChange}
      onDestinationChange={handleDestinationChange}
      showOriginValidationError={showOriginValidationError}
      showDestinationValidationError={showDestinationValidationError}
      showOriginMissingError={props.showOriginMissingError}
      showDestinationMissingError={props.showDestinationMissingError}
      onSwitcherClick={handleSwitcherClick}
      stations={stations}
      onClearButtonClick={handleClearButtonClick}
    />
  );
};

export default StationsSelectorContainer;
