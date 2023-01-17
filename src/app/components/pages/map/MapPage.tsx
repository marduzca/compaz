import React from 'react';
import styles from './MapPage.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';
import MapContainer from '../navigation/map/MapContainer';

interface MapPageProps {
  onMenuButtonClick: () => void;
}

const MapPage: React.FC<MapPageProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader
      onMenuButtonClick={props.onMenuButtonClick}
      hasLightBackground
    />
    <MapContainer />
  </main>
);

export default MapPage;
