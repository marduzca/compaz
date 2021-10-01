import React, { useState } from 'react';
import RouteDetailsView from './RouteDetailsView';
import { Route } from '../../../domain';

interface RouteDetailsViewContainerProps {
  route: Route;
  departureTime: Date;
}

const RouteDetailsViewContainer: React.FC<RouteDetailsViewContainerProps> = (
  props
) => {
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
    />
  );
};

export default RouteDetailsViewContainer;
