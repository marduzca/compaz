/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import StationsSelector from './StationsSelector';
import { useNavigation } from '../../../providers/NavigationProvider';
import { useFirebase } from '../../../providers/FirebaseProvider';

const EMPTY_STATION = {
  connectedStations: [],
  id: '',
  lines: [],
  name: '',
};

const StationsSelectorContainer: React.FC = () => {
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
  const [originValidationError, setOriginValidationError] =
    useState<boolean>(false);
  const [destinationValidationError, setDestinationValidationError] =
    useState<boolean>(false);

  useEffect(() => {
    generateStationsMap(stations);
  }, [stations]);

  const shouldShowValidationError = (
    filterOutValue: string,
    searchTerm: string
  ): boolean =>
    !stations
      .filter((station) => station.name !== filterOutValue)
      .some((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleOriginChange = (newOrigin: string) => {
    setOriginInputValue(newOrigin);
    setOriginValidationError(
      shouldShowValidationError(destination.name, newOrigin)
    );

    const newOriginStation = stations.find(
      (station) => station.name === newOrigin
    );
    if (newOriginStation) {
      setOriginStation(newOriginStation);
    } else if (origin.id) {
      setOriginStation(EMPTY_STATION);
    }
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestinationInputValue(newDestination);
    setDestinationValidationError(
      shouldShowValidationError(origin.name, newDestination)
    );

    const newDestinationStation = stations.find(
      (station) => station.name === newDestination
    );
    if (newDestinationStation) {
      setDestinationStation(newDestinationStation);
    } else if (destination.id) {
      setDestinationStation(EMPTY_STATION);
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
      originValidationError={originValidationError}
      destinationValidationError={destinationValidationError}
      onSwitcherClick={handleSwitcherClick}
      stations={stations}
    />
  );
};

export default StationsSelectorContainer;
