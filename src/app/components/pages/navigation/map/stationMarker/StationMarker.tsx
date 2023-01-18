import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GeoLocation } from '../../../../domain';
import originMarker from '../../../../../static/svg/origin_marker.svg';
import destinationMarker from '../../../../../static/svg/destination_marker.svg';
import stationMarker from '../../../../../static/svg/station_marker.svg';
import styles from './StationMarker.module.css';

interface StationMarkerProps {
  name: string;
  geoLocation: GeoLocation;
  isMobile: boolean;
  isOrigin?: boolean;
  isDestination?: boolean;
  isIntermediateStation: boolean;
}

const StationMarker: React.FC<StationMarkerProps> = (props) => {
  const getCorrespondingMarker = () => {
    if (props.isOrigin) {
      return originMarker;
    }

    if (props.isDestination) {
      return destinationMarker;
    }

    return stationMarker;
  };

  return (
    <MarkerF
      position={{
        lat: props.geoLocation.latitude,
        lng: props.geoLocation.longitude,
      }}
      icon={{
        url: getCorrespondingMarker(),
        scaledSize: props.isMobile
          ? {
              height: 40,
              width: 40,
              equals: () =>
                // This is here only to make TypeScript happy, but won't have any use
                true,
            }
          : undefined,
        labelOrigin: {
          x: props.isMobile ? 17 : 21,
          y: -15,
          equals: () =>
            // This is here only to make TypeScript happy, but won't have any use
            true,
        },
      }}
      label={
        !props.isIntermediateStation
          ? {
              text: props.name.toUpperCase(),
              fontWeight: '900',
              fontSize: '1rem',
              color: '#4f4f4f',
              className: styles.markerLabel,
            }
          : undefined
      }
    />
  );
};

StationMarker.defaultProps = {
  isOrigin: false,
  isDestination: false,
};

export default StationMarker;
