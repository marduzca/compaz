import React from 'react';
import RoutesOverview from './RoutesOverview';

interface RoutesOverviewContainerProps {
  route: string[];
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
