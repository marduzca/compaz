import React, { useEffect, useMemo, useState } from 'react';
import StationsSelector from './StationsSelector';
import { useNavigation } from '../../../../../providers/navigation/NavigationProvider';
import { useFirebase } from '../../../../../providers/firebase/FirebaseProvider';
import { Station } from '../../../../../domain';

interface StationsSelectorContainerProps {
  showOriginSubmissionError: boolean;
  setShowOriginSubmissionError: (newValue: boolean) => void;
  showDestinationSubmissionError: boolean;
  setShowDestinationSubmissionError: (newValue: boolean) => void;
}

const StationsSelectorContainer: React.FC<StationsSelectorContainerProps> = (
  props,
) => {
  const { stations, lines } = useFirebase();
  const {
    origin,
    destination,
    setOriginStation,
    setDestinationStation,
    generateStationsMap,
  } = useNavigation();

  const [originInputValue, setOriginInputValue] = useState<string>(
    origin?.name || '',
  );
  const [destinationInputValue, setDestinationInputValue] = useState<string>(
    destination?.name || '',
  );
  const [showOriginValidationError, setShowOriginValidationError] =
    useState<boolean>(false);
  const [showDestinationValidationError, setShowDestinationValidationError] =
    useState<boolean>(false);

  useEffect(() => {
    generateStationsMap(stations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations]);

  const stationsGroupedByLine = useMemo(() => {
    const stationsGroupedByLine: Record<string, Station[]> = {};

    lines.forEach((line) => {
      stationsGroupedByLine[line.id] = line.stationsPath
        .map((stationId) =>
          stations.find((station) => station.id === stationId),
        )
        .filter((station): station is Station => station !== undefined);
    });

    return stationsGroupedByLine;
  }, [lines, stations]);

  const shouldShowValidationError = (
    searchTerm: string,
    filterOutValue: string | undefined = '',
  ): boolean =>
    !stations
      .filter((station) => station.name !== filterOutValue)
      .some((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

  const handleOriginChange = (newOrigin: string) => {
    setOriginInputValue(newOrigin);
    setShowOriginValidationError(
      shouldShowValidationError(newOrigin, destination?.name),
    );

    const newOriginStation = stations.find(
      (station) => station.name === newOrigin || station.id === newOrigin,
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
      shouldShowValidationError(newDestination, origin?.name),
    );

    const newDestinationStation = stations.find(
      (station) =>
        station.name === newDestination || station.id === newDestination,
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
    props.setShowOriginSubmissionError(false);
    setOriginStation(undefined);
  };

  const handleClearDestinationButtonClick = () => {
    setDestinationInputValue('');
    setShowDestinationValidationError(false);
    props.setShowDestinationSubmissionError(false);
    setDestinationStation(undefined);
  };

  const handleSwitcherClick = () => {
    props.setShowOriginSubmissionError(false);
    props.setShowDestinationSubmissionError(false);

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
      showOriginValidationError={
        showOriginValidationError || props.showOriginSubmissionError
      }
      showDestinationValidationError={
        showDestinationValidationError || props.showDestinationSubmissionError
      }
      onSwitcherClick={handleSwitcherClick}
      stations={stations}
      onClearOriginButtonClick={handleClearOriginButtonClick}
      onClearDestinationButtonClick={handleClearDestinationButtonClick}
      stationsGroupedByLine={stationsGroupedByLine}
    />
  );
};

export default StationsSelectorContainer;
