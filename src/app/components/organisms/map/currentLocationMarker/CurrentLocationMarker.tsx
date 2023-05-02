import React, { useEffect, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GeoLocation } from '../../../domain';
import currentLocationIcon from '../../../../static/svg/current_location.svg';

const CurrentLocationMarker: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<
    GeoLocation | undefined
  >(undefined);

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

export default CurrentLocationMarker;
