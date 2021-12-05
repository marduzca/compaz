import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import i18n from 'i18next';
import Map from './Map';
import { useNavigation } from '../../providers/NavigationProvider';
import { Station } from '../../domain';

const MapContainer: React.FC = () => {
  const { origin, destination } = useNavigation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY || 'fake-key',
    language: i18n.language,
    preventGoogleFontsLoading: true,
  });

  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined
  );
  const [markers, setMarkers] = useState<Station[]>([]);

  useEffect(() => {
    let newMarkers: Station[] = [];
    if (markers.length < 2) {
      newMarkers = [...markers];
    }

    if (origin && !newMarkers.includes(origin)) {
      newMarkers.unshift(origin);
    }

    if (destination && !newMarkers.includes(destination)) {
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
          lat: marker.geoLocation.latitude,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  return (
    <Map isLoaded={isLoaded} markers={markers} onGoogleMapLoad={setGoogleMap} />
  );
};

export default MapContainer;
