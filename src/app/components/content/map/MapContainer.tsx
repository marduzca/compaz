import React, { useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import i18n from 'i18next';
import Map from './Map';
import { useFirebase } from '../../providers/FirebaseProvider';

const MapContainer: React.FC = () => {
  const { MAPS_API_KEY } = useFirebase();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NODE_ENV === 'production'
        ? MAPS_API_KEY
        : process.env.REACT_APP_MAPS_API_KEY || '',
    language: i18n.language,
  });

  useEffect(() => {
    // Wait for API_KEY to be available
  }, [MAPS_API_KEY]);

  console.log(MAPS_API_KEY);

  const path = [
    { lat: -16.53806872367538, lng: -68.08744814042824 },
    { lat: -16.50037734751927, lng: -68.13262871838528 },
  ];

  return <Map isLoaded={isLoaded} path={path} />;
};

export default MapContainer;
