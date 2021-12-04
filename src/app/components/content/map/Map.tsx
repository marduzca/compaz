import React from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import stationIcon from '../../../static/img/station.svg';
import styles from './Map.module.css';
import { Station } from '../../domain';

interface MapProps {
  isLoaded: boolean;
  markers: Station[];
  setGoogleMap: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = (props) => {
  const laPazCenter = { lat: -16.494363149497282, lng: -68.1572941780699 };

  return (
    <>
      {props.isLoaded && (
        <GoogleMap
          center={laPazCenter}
          zoom={13}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{ disableDefaultUI: true, minZoom: 11 }}
          onLoad={props.setGoogleMap}
        >
          {props.markers.length &&
            props.markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{
                  lat: marker.geoLocation.latitude,
                  lng: marker.geoLocation.longitude,
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
                  text: marker.name.toUpperCase(),
                  fontWeight: '900',
                  fontSize: '16px',
                  color: '#4f4f4f',
                }}
              />
            ))}
          {props.markers.length > 1 &&
            props.markers.map((marker, index) => {
              if (index % 2 === 0) {
                return <></>;
              }

              return (
                <Polyline
                  key={`line_${props.markers[index - 1].id}_to_${marker.id}`}
                  path={[
                    {
                      lat: props.markers[index - 1].geoLocation.latitude,
                      lng: props.markers[index - 1].geoLocation.longitude,
                    },
                    {
                      lat: marker.geoLocation.latitude,
                      lng: marker.geoLocation.longitude,
                    },
                  ]}
                  options={{
                    strokeColor: '#26C6DA',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  }}
                />
              );
            })}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
