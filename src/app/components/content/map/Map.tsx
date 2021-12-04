/* eslint-disable */
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
  return (
    <>
      {props.isLoaded && (
        <GoogleMap
          center={{ lat: -16.505348019297106, lng: -68.1387978668128 }}
          zoom={14}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{ disableDefaultUI: true, minZoom: 10 }}
          onLoad={props.setGoogleMap}
        >
          {props.markers.length &&
            props.markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{
                  // @ts-ignore
                  lat: marker.geoLocation.latitude,
                  // @ts-ignore
                  lng: marker.geoLocation.longitude,
                }}
                icon={{
                  url: stationIcon,
                  // @ts-ignore
                  labelOrigin: {
                    x: 30,
                    y: -15,
                  },
                }}
                label={{
                  text: marker.name,
                  fontWeight: '700',
                  fontSize: '16px',
                  color: '#1976D2',
                }}
              />
            ))}
          {props.markers.length > 1 &&
            props.markers.map((marker, index) => {
              if (index % 2 === 0) {
                return;
              }

              return (
                <Polyline
                  key={`line_${props.markers[index - 1].id}_to_${marker.id}`}
                  path={[
                    {
                      // @ts-ignore
                      lat: props.markers[index - 1].geoLocation.latitude,
                      // @ts-ignore
                      lng: props.markers[index - 1].geoLocation.longitude,
                    },
                    {
                      // @ts-ignore
                      lat: marker.geoLocation.latitude,
                      // @ts-ignore
                      lng: marker.geoLocation.longitude,
                    },
                  ]}
                />
              );
            })}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
