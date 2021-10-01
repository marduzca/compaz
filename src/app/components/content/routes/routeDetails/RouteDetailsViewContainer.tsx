import React from 'react';
import RouteDetailsView from './RouteDetailsView';
import { Route } from '../../../domain';

interface RouteDetailsViewContainerProps {
  route: Route;
  departureTime: Date;
}

const RouteDetailsViewContainer: React.FC<RouteDetailsViewContainerProps> = (
  props
) => (
  <RouteDetailsView route={props.route} departureTime={props.departureTime} />
);

export default RouteDetailsViewContainer;
