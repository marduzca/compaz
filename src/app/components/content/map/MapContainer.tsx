import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import i18n from 'i18next';
import Map from './Map';

interface MapContainerProps {
  mapsApiKey: string;
}

const MapContainer: React.FC<MapContainerProps> = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NODE_ENV === 'production'
        ? props.mapsApiKey
        : process.env.REACT_APP_MAPS_API_KEY || '',
    language: i18n.language,
  });

  const path = [
    { lat: -16.53806872367538, lng: -68.08744814042824 },
    { lat: -16.50037734751927, lng: -68.13262871838528 },
  ];

  return <Map isLoaded={isLoaded} path={path} />;
};

export default MapContainer;