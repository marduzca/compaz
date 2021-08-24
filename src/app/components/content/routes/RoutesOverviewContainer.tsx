import React from 'react';
import RoutesOverview from './RoutesOverview';

interface RoutesOverviewContainerProps {
  route: string[];
}

const RoutesOverviewContainer: React.FC<RoutesOverviewContainerProps> = (
  props
) => <RoutesOverview route={props.route} />;

export default RoutesOverviewContainer;
