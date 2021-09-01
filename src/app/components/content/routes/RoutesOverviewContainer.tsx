import React from 'react';
import RoutesOverview from './RoutesOverview';
import { Station } from '../../domain';

interface RoutesOverviewContainerProps {
  route: Station[];
  onBackButtonClick: () => void;
}

const RoutesOverviewContainer: React.FC<RoutesOverviewContainerProps> = (
  props
) => (
  <RoutesOverview
    route={props.route}
    onBackButtonClick={props.onBackButtonClick}
  />
);

export default RoutesOverviewContainer;
