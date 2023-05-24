import React, { useCallback, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../providers/navigation/NavigationProvider';
import { Route } from '../../domain';
import useMediaQuery from '../../hooks/useMediaQuery';
import { MapLine } from '../../pages/map/MapPage';
import useMapFitBounds from '../../hooks/useMapFitBounds';
import LatLngBounds = google.maps.LatLngBounds;

export enum MapMode {
  ROUTE = 'ROUTE',
  ORIGIN_AND_DESTINATION = 'ORIGIN_AND_DESTINATION',
  LINES = 'LINES',
}

interface MapContainerProps {
  route?: Route;
  lines?: MapLine[];
}

const MapContainer: React.FC<MapContainerProps> = (props) => {
  const isMobile = useMediaQuery(); // Only used to adjust bounds if the screen dynamically changes size to be mobile
  const { origin, destination } = useNavigation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY || 'fake-key',
    language: navigator.language,
    preventGoogleFontsLoading: true,
  });

  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined
  );

  const [currentMapMode, setCurrentMapMode] = useState<MapMode>(
    MapMode.ORIGIN_AND_DESTINATION
  );

  const { fitScreenToBounds } = useMapFitBounds(googleMap);

  const defineBoundsBasedOnCurrentMapMode = useCallback((): LatLngBounds => {
    const bounds = new window.google.maps.LatLngBounds();

    if (currentMapMode === MapMode.ROUTE && props.route) {
      props.route.subRoutes.forEach((subRoute) => {
        subRoute.stationsPath.forEach((station) => {
          bounds.extend({
            lat: station.geoLocation.latitude,
            lng: station.geoLocation.longitude,
          });
        });
      });

      return bounds;
    }

    if (currentMapMode === MapMode.LINES && props.lines?.length) {
      props.lines.forEach((line) =>
        line.stationsPath.forEach((station) => {
          bounds.extend({
            lat: station.geoLocation.latitude,
            lng: station.geoLocation.longitude,
          });
        })
      );

      return bounds;
    }

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

    return bounds;
  }, [currentMapMode, destination, origin, props.lines, props.route]);

  useEffect(() => {
    if (props.route) {
      setCurrentMapMode(MapMode.ROUTE);

      return;
    }

    if (props.lines?.length) {
      setCurrentMapMode(MapMode.LINES);

      return;
    }

    if (origin || destination) {
      setCurrentMapMode(MapMode.ORIGIN_AND_DESTINATION);
    }
  }, [destination, origin, props.lines?.length, props.route]);

  useEffect(() => {
    if (isLoaded && googleMap) {
      if (!props.lines?.length && !props.route && !origin && !destination) {
        googleMap.setZoom(12);

        return;
      }

      const markerBounds = defineBoundsBasedOnCurrentMapMode();
      fitScreenToBounds(markerBounds, currentMapMode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.route,
    props.lines,
    origin,
    destination,
    googleMap,
    isLoaded,
    isMobile,
    currentMapMode,
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
