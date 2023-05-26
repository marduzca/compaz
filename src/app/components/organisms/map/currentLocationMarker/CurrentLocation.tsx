import React, { useEffect, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GeoLocation } from '../../../domain';
import currentLocationIcon from '../../../../static/svg/current_location.svg';
import useMapFitBounds from '../../../hooks/useMapFitBounds/useMapFitBounds';
import { MapMode } from '../MapContainer';
import styles from './CurrentLocation.module.css';

interface CurrentLocationMarkerProps {
  googleMapReference?: google.maps.Map;
}

const CurrentLocation: React.FC<CurrentLocationMarkerProps> = (props) => {
  const { fitScreenToBounds } = useMapFitBounds(props.googleMapReference);

  const [currentLocation, setCurrentLocation] = useState<
    GeoLocation | undefined
  >(undefined);

  const handleMoveToCurrentLocationClick = () => {
    if (currentLocation) {
      fitScreenToBounds([currentLocation], MapMode.CURRENT_LOCATION);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      );
    } else {
      // Handle error: Browser doesn't support Geolocation
    }
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleMoveToCurrentLocationClick}
        className={styles.currentLocationButton}
      >
        Current location
      </button>
      {currentLocation && (
        <MarkerF
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          zIndex={2}
          icon={{
            url: currentLocationIcon,
            scaledSize: {
              height: 30,
              width: 30,
              equals: () =>
                // This is here only to make TypeScript happy, but won't have any use
                true,
            },
          }}
        />
      )}
    </>
  );
};

CurrentLocation.defaultProps = {
  googleMapReference: undefined,
};

export default CurrentLocation;
