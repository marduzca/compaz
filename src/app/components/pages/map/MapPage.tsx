import React from 'react';
import styles from './MapPage.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';
import MapContainer from '../navigation/map/MapContainer';
import { MapLine } from './MapPageContainer';

interface MapPageProps {
  onMenuButtonClick: () => void;
  lines: MapLine[];
}

const MapPage: React.FC<MapPageProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader
      onMenuButtonClick={props.onMenuButtonClick}
      hasLightBackground
    />
    <MapContainer lines={props.lines} />
  </main>
);

export default MapPage;
