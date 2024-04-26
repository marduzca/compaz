import React, { useMemo } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GeoLocation } from '../../../domain';
import originMarker from '../../../../static/svg/origin_marker.svg';
import destinationMarker from '../../../../static/svg/destination_marker.svg';
import stationMarker from '../../../../static/svg/station_marker.svg';
import styles from './StationMarker.module.css';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface StationMarkerProps {
  name: string;
  geoLocation: GeoLocation;
  isOrigin?: boolean;
  isDestination?: boolean;
  isIntermediateStation?: boolean;
  isLinesMap?: boolean;
}

const StationMarker: React.FC<StationMarkerProps> = ({
  isOrigin = false,
  isDestination = false,
  isIntermediateStation = false,
  isLinesMap = false,
  name,
  geoLocation,
}) => {
  const isMobile = useMediaQuery();

  const correspondingMarker = useMemo(() => {
    if (isOrigin) {
      return originMarker;
    }

    if (isDestination) {
      return destinationMarker;
    }

    return stationMarker;
  }, [isDestination, isOrigin]);

  const iconSize = useMemo(() => {
    if (isMobile && isLinesMap) {
      return 32.5;
    }

    // If mobile: 40, else if isLinesMap: 45
    return isMobile ? 40 : 45;
  }, [isMobile, isLinesMap]);

  const labelFontSize = useMemo(() => {
    if (isMobile && isLinesMap) {
      return '0.625rem';
    }

    if (isMobile || isLinesMap) {
      return '0.75rem';
    }

    return '1rem';
  }, [isMobile, isLinesMap]);

  const labelPosition = useMemo(() => {
    if (isMobile && isLinesMap) {
      return 13;
    }

    if (isMobile) {
      return 17;
    }

    if (isLinesMap) {
      return 18;
    }

    return 21;
  }, [isMobile, isLinesMap]);

  return (
    <MarkerF
      position={{
        lat: geoLocation.latitude,
        lng: geoLocation.longitude,
      }}
      icon={{
        url: correspondingMarker,
        scaledSize:
          isLinesMap || isMobile
            ? {
                height: iconSize,
                width: iconSize,
                equals: () =>
                  // This is here only to make TypeScript happy, but won't have any use
                  true,
              }
            : undefined,
        labelOrigin: {
          x: labelPosition,
          y: -15,
          equals: () =>
            // This is here only to make TypeScript happy, but won't have any use
            true,
        },
      }}
      label={
        !isIntermediateStation
          ? {
              text: name.toUpperCase(),
              fontWeight: '900',
              fontSize: labelFontSize,
              color: '#4f4f4f',
              className: styles.markerLabel,
            }
          : undefined
      }
    />
  );
};

export default StationMarker;
