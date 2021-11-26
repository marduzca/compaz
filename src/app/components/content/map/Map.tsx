import React from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import stationIcon from '../../../static/img/station.svg';
import styles from './Map.module.css';
import { GeoLocation } from '../../domain';

interface MapProps {
  path: GeoLocation[];
  isLoaded: boolean;
}

const Map: React.FC<MapProps> = (props) => (
  <>
    {props.isLoaded && (
      <GoogleMap
        center={props.path[0]}
        zoom={13}
        mapContainerClassName={styles.map}
        clickableIcons={false}
        options={{ disableDefaultUI: true, minZoom: 10 }}
      >
        <Marker
          position={props.path[0]}
          icon={{
            url: stationIcon,
            // @ts-ignore
            labelOrigin: {
              x: 84,
              y: 30,
            },
          }}
          label={{
            text: 'Irpavi',
            fontWeight: '700',
            fontSize: '16px',
            color: '#1976D2',
          }}
        />
        <Marker
          position={props.path[1]}
          icon={{
            url: stationIcon,
            // @ts-ignore
            labelOrigin: {
              x: 84,
              y: 30,
            },
          }}
          label={{
            text: 'Prado',
            fontWeight: '700',
            fontSize: '16px',
            color: '#1976D2',
          }}
        />
        <Polyline path={props.path} />
      </GoogleMap>
    )}
  </>
);

export default Map;
