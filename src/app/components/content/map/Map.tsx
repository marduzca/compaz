import React from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import stationIcon from '../../../static/img/station.svg';
import styles from './Map.module.css';
import { GeoLocation, Station } from '../../domain';

interface StationMarkerProps {
  id: string;
  name: string;
  geoLocation: GeoLocation;
}

const StationMarker: React.FC<StationMarkerProps> = (props) => (
  <Marker
    key={props.id}
    position={{
      lat: props.geoLocation.latitude,
      lng: props.geoLocation.longitude,
    }}
    icon={{
      url: stationIcon,
      labelOrigin: {
        x: 30,
        y: -15,
        equals: () =>
          // This is here only to make TypeScript happy, but won't have any use
          true,
      },
    }}
    label={{
      text: props.name.toUpperCase(),
      fontWeight: '900',
      fontSize: '16px',
      color: '#4f4f4f',
    }}
  />
);

interface StationsConnectorProps {
  fromId: string;
  fromGeoLocation: GeoLocation;
  toId: string;
  toGeoLocation: GeoLocation;
}

const StationsConnector: React.FC<StationsConnectorProps> = (props) => (
  <Polyline
    key={`line_${props.fromId}_to_${props.toId}`}
    path={[
      {
        lat: props.fromGeoLocation.latitude,
        lng: props.fromGeoLocation.longitude,
      },
      {
        lat: props.toGeoLocation.latitude,
        lng: props.toGeoLocation.longitude,
      },
    ]}
    options={{
      strokeColor: '#26C6DA',
      strokeOpacity: 0.8,
      strokeWeight: 4,
    }}
  />
);

interface MapProps {
  isLoaded: boolean;
  origin: Station | undefined;
  destination: Station | undefined;
  onGoogleMapLoad: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = (props) => {
  const { t } = useTranslation();
  const LA_PAZ_CENTER = { lat: -16.494363149497282, lng: -68.1572941780699 };

  return (
    <div className={styles.container}>
      {props.isLoaded ? (
        <GoogleMap
          center={LA_PAZ_CENTER}
          zoom={12}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{ disableDefaultUI: true, minZoom: 11 }}
          onLoad={props.onGoogleMapLoad}
        >
          {props.origin && (
            <StationMarker
              id={props.origin.id}
              name={props.origin.name}
              geoLocation={props.origin.geoLocation}
            />
          )}
          {props.destination && (
            <StationMarker
              id={props.destination.id}
              name={props.destination.name}
              geoLocation={props.destination.geoLocation}
            />
          )}
          {props.origin && props.destination && (
            <StationsConnector
              fromId={props.origin.id}
              fromGeoLocation={props.origin.geoLocation}
              toId={props.destination.id}
              toGeoLocation={props.destination.geoLocation}
            />
          )}
        </GoogleMap>
      ) : (
        <span aria-label={t('LOADING_MAP')} className={styles.loader} />
      )}
    </div>
  );
};

export default Map;
