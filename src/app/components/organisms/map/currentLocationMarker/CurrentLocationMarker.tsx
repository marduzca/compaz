import React, { useEffect, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { GeoLocation } from '../../../domain';

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
          label={{ text: 'My location' }}
        />
      )}
    </>
  );
};

export default CurrentLocationMarker;
