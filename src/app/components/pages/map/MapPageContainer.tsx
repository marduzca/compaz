import React from 'react';
import MapPage from './MapPage';

interface MapPageContainerProps {
  onMenuButtonClick: () => void;
}

const MapPageContainer: React.FC<MapPageContainerProps> = (props) => (
  <MapPage onMenuButtonClick={props.onMenuButtonClick} />
);
export default MapPageContainer;
