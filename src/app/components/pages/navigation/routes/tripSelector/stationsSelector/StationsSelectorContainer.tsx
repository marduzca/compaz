import React, { useEffect, useMemo, useState } from 'react';
import StationsSelector from './StationsSelector';
import { useNavigation } from '../../../../../providers/navigation/NavigationProvider';
import { useFirebase } from '../../../../../providers/firebase/FirebaseProvider';
import { LineColor, Station } from '../../../../../domain';
import { StationsOfLine } from '../../../../../atoms/station-picker/StationPicker';

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

  const findStationId = (inputValue: string): string | undefined =>
    stations.find(
      (station) => station.id === inputValue || station.name === inputValue,
    )?.id;

  const originStationId = findStationId(originInputValue);
  const destinationStationId = findStationId(destinationInputValue);

  const groupsExcluding = (excludedId: string | undefined): StationsOfLine[] =>
    lines.map((line) => ({
      line: line.id as LineColor,
      stations: line.stationsPath
        .filter((stationId) => stationId !== excludedId)
        .map((stationId) => stations.find((s) => s.id === stationId))
        .filter((station): station is Station => station !== undefined),
    }));

  const originGroups = useMemo(
    () => groupsExcluding(destinationStationId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, stations, destinationStationId],
  );
  const destinationGroups = useMemo(
    () => groupsExcluding(originStationId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, stations, originStationId],
  );

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
    const newOriginStation = stations.find(
      (station) => station.name === newOrigin || station.id === newOrigin,
    );
    const originText = newOriginStation?.name ?? newOrigin;
    setOriginInputValue(originText);
    setShowOriginValidationError(
      shouldShowValidationError(originText, destination?.name),
    );

    if (newOriginStation) {
      setOriginStation(newOriginStation);
    } else if (origin) {
      setOriginStation(undefined);
    }
  };

  const handleDestinationChange = (newDestination: string) => {
    const newDestinationStation = stations.find(
      (station) =>
        station.name === newDestination || station.id === newDestination,
    );
    const destinationText = newDestinationStation?.name ?? newDestination;
    setDestinationInputValue(destinationText);
    setShowDestinationValidationError(
      shouldShowValidationError(destinationText, origin?.name),
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
      originGroups={originGroups}
      destinationGroups={destinationGroups}
      originStationId={originStationId}
      destinationStationId={destinationStationId}
    />
  );
};

export default StationsSelectorContainer;
