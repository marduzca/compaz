import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../providers/navigation/NavigationProvider';
import { Route } from '../../domain';
import useMediaQuery from '../../useMediaQuery';

interface MapContainerProps {
  route?: Route;
}

const MapContainer: React.FC<MapContainerProps> = (props) => {
  const isMobile = useMediaQuery();
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

      if (props.route) {
        props.route.subRoutes.forEach((subRoute) => {
          subRoute.stationsPath.forEach((station) => {
            bounds.extend({
              lat: station.geoLocation.latitude,
              lng: station.geoLocation.longitude,
            });
          });
        });
      } else {
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
      }

      if (googleMap) {
        if (props.route) {
          googleMap.fitBounds(bounds);

          if (!isMobile) {
            googleMap.panBy(window.innerWidth * -0.1, 0);
          }
        } else if (origin || destination) {
          googleMap.fitBounds(bounds);
        } else {
          googleMap.setZoom(12);
        }
      }
    };

    if (isLoaded) {
      fitBounds();
    }
  }, [origin, destination, props.route, googleMap, isLoaded, isMobile]);

  return (
    <Map
      isLoaded={isLoaded}
      origin={origin}
      destination={destination}
      route={props.route}
      isMobile={isMobile}
      onGoogleMapLoad={setGoogleMap}
    />
  );
};

MapContainer.defaultProps = { route: undefined };

export default MapContainer;
