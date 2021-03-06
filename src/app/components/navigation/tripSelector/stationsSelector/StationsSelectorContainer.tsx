import React, { useEffect, useState } from 'react';
import StationsSelector from './StationsSelector';
import { useNavigation } from '../../../providers/navigation/NavigationProvider';
import { useFirebase } from '../../../providers/firebase/FirebaseProvider';

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
    searchTerm: string,
    filterOutValue: string | undefined = ''
  ): boolean =>
    !stations
      .filter((station) => station.name !== filterOutValue)
      .some((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleOriginChange = (newOrigin: string) => {
    setOriginInputValue(newOrigin);
    setShowOriginValidationError(
      shouldShowValidationError(newOrigin, destination?.name)
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
      shouldShowValidationError(newDestination, origin?.name)
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

  const handleClearOriginButtonClick = () => {
    setOriginInputValue('');
    setShowOriginValidationError(false);
    setOriginStation(undefined);
  };

  const handleClearDestinationButtonClick = () => {
    setDestinationInputValue('');
    setShowDestinationValidationError(false);
    setDestinationStation(undefined);
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
      onClearOriginButtonClick={handleClearOriginButtonClick}
      onClearDestinationButtonClick={handleClearDestinationButtonClick}
    />
  );
};

export default StationsSelectorContainer;
