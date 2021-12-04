import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import i18n from 'i18next';
import Map from './Map';
import { useNavigation } from '../../providers/NavigationProvider';
import { Station } from '../../domain';

// TODO: Remove geolocation optional
// TODO: Make origin/destination undefined
const MapContainer: React.FC = () => {
  const { origin, destination } = useNavigation();

  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined
  );
  const [markers, setMarkers] = useState<Station[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY || 'fake-key',
    language: i18n.language,
    preventGoogleFontsLoading: true,
  });

  useEffect(() => {
    const newMarkers = [...markers];

    if (origin?.id && !markers.includes(origin)) {
      newMarkers.unshift(origin);
    }

    if (destination?.id && !markers.includes(destination)) {
      newMarkers.push(destination);
    }

    setMarkers(newMarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  useEffect(() => {
    const fitBounds = () => {
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach((marker) => {
        bounds.extend({
          // @ts-ignore
          lat: marker.geoLocation.latitude,
          // @ts-ignore
          lng: marker.geoLocation.longitude,
        });
      });

      if (googleMap) {
        googleMap.fitBounds(bounds);
      }
    };

    if (isLoaded) {
      fitBounds();
    }
  }, [googleMap, isLoaded, markers]);

  return (
    <Map isLoaded={isLoaded} markers={markers} setGoogleMap={setGoogleMap} />
  );
};

export default MapContainer;
