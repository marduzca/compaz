import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../../providers/navigation/NavigationProvider';
import { Route } from '../../../domain';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { MapLine } from '../../map/MapPageContainer';

interface MapContainerProps {
  route?: Route;
  lines?: MapLine[];
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

      if (props.lines?.length) {
        props.lines.forEach((line) =>
          line.stationsPath.forEach((station) => {
            bounds.extend({
              lat: station.geoLocation.latitude,
              lng: station.geoLocation.longitude,
            });
          })
        );
      }

      if (googleMap) {
        if (!props.lines?.length && !props.route && !origin && !destination) {
          googleMap.setZoom(12);

          return;
        }

        googleMap.fitBounds(bounds);

        if (props.route) {
          if (!isMobile) {
            googleMap.panBy(window.innerWidth * -0.1, 0);
          } else {
            googleMap.panBy(0, window.innerHeight * 0.2);
          }
        }

        if (props.lines?.length) {
          if (window.innerHeight > window.innerWidth || isMobile) {
            googleMap.setZoom(13);
          } else {
            googleMap.panBy(0, window.innerHeight * -0.03);
          }
        }
      }
    };

    if (isLoaded) {
      fitBounds();
    }
  }, [
    origin,
    destination,
    props.route,
    googleMap,
    isLoaded,
    isMobile,
    props.lines,
  ]);

  return (
    <Map
      isLoaded={isLoaded}
      origin={origin}
      destination={destination}
      route={props.route}
      onGoogleMapLoad={setGoogleMap}
      lines={props.lines}
    />
  );
};

MapContainer.defaultProps = { route: undefined, lines: undefined };

export default MapContainer;
