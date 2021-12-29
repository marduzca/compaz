import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../providers/NavigationProvider';

const MapContainer: React.FC = () => {
  const { origin, destination } = useNavigation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY || 'fake-key',
    language: navigator.language,
    preventGoogleFontsLoading: true,
  });

  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined
  );

  useEffect(() => {
    const fitBounds = () => {
      const bounds = new window.google.maps.LatLngBounds();

      if (origin) {
        bounds.extend({
          lat: origin.geoLocation.latitude,
          lng: origin.geoLocation.longitude,
        });
      }
      if (destination) {
        bounds.extend({
          lat: destination.geoLocation.latitude,
          lng: destination.geoLocation.longitude,
        });
      }

      if (googleMap) {
        if (origin || destination) {
          googleMap.fitBounds(bounds);
        } else {
          googleMap.setZoom(12);
        }
      }
    };

    if (isLoaded) {
      fitBounds();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  return (
    <Map
      isLoaded={isLoaded}
      origin={origin}
      destination={destination}
      onGoogleMapLoad={setGoogleMap}
    />
  );
};

export default MapContainer;
