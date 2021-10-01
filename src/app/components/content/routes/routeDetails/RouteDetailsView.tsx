import React from 'react';
import { Route } from '../../../domain';
import SubRouteDetails from './SubRouteDetails';
import { addMinutesToDate } from '../../dateFormatter';

interface RouteDetailsViewProps {
  route: Route;
  departureTime: Date;
  linesWithOpenIntermediateStations: string[];
  onIntermediateStationsButtonClick: (line: string) => void;
}

const RouteDetailsView: React.FC<RouteDetailsViewProps> = (props) => {
  let passedTime = 0;

  return (
    <>
      <p>HEADER</p>
      <br />
      {props.route.subRoutes.map((subRoute) => {
        passedTime += subRoute.totalTime;

        return (
          <SubRouteDetails
            key={subRoute.line}
            subRoute={subRoute}
            startTime={addMinutesToDate(
              props.departureTime,
              passedTime - subRoute.totalTime
            )}
            showIntermediateStations={props.linesWithOpenIntermediateStations.includes(
              subRoute.line
            )}
            onIntermediateStationsButtonClick={
              props.onIntermediateStationsButtonClick
            }
          />
        );
      })}
    </>
  );
};

export default RouteDetailsView;
