import React, { useState } from 'react';
import RouteDetailsView from './RouteDetailsView';
import { Route } from '../../../../domain';
import useMediaQuery from '../../../../hooks/useMediaQuery';

interface RouteDetailsViewContainerProps {
  route: Route;
  departureTime: Date;
  onBackButtonClick: () => void;
}

const RouteDetailsViewContainer: React.FC<RouteDetailsViewContainerProps> = (
  props
) => {
  const isMobile = useMediaQuery();

  const [
    linesWithOpenIntermediateStations,
    setLinesWithOpenIntermediateStations,
  ] = useState<string[]>([]);

  const handleIntermediateStationsButtonClick = (line: string) => {
    const updatedLinesWithOpenIntermediateStations = [
      ...linesWithOpenIntermediateStations,
    ];

    if (updatedLinesWithOpenIntermediateStations.includes(line)) {
      const index = updatedLinesWithOpenIntermediateStations.indexOf(line);
      updatedLinesWithOpenIntermediateStations.splice(index, 1);
    } else {
      updatedLinesWithOpenIntermediateStations.push(line);
    }

    setLinesWithOpenIntermediateStations(
      updatedLinesWithOpenIntermediateStations
    );
  };

  return (
    <RouteDetailsView
      route={props.route}
      departureTime={props.departureTime}
      linesWithOpenIntermediateStations={linesWithOpenIntermediateStations}
      onIntermediateStationsButtonClick={handleIntermediateStationsButtonClick}
      isMobile={isMobile}
      onBackButtonClick={props.onBackButtonClick}
    />
  );
};

export default RouteDetailsViewContainer;
