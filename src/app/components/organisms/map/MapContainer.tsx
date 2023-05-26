import React, { useCallback, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../providers/navigation/NavigationProvider';
import { GeoLocation, Route } from '../../domain';
import useMediaQuery from '../../hooks/useMediaQuery';
import { MapLine } from '../../pages/map/MapPage';
import useMapFitBounds from '../../hooks/useMapFitBounds';

export enum MapMode {
  ROUTE = 'ROUTE',
  ORIGIN_AND_DESTINATION = 'ORIGIN_AND_DESTINATION',
  LINES = 'LINES',
  CURRENT_LOCATION = 'CURRENT_LOCATION',
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

  const defineMarkerLocationsBasedOnCurrentMapMode =
    useCallback((): GeoLocation[] => {
      const markerLocations: GeoLocation[] = [];

      if (currentMapMode === MapMode.ROUTE && props.route) {
        props.route.subRoutes.forEach((subRoute) => {
          subRoute.stationsPath.forEach((station) => {
            markerLocations.push({
              latitude: station.geoLocation.latitude,
              longitude: station.geoLocation.longitude,
            });
          });
        });

        return markerLocations;
      }

      if (currentMapMode === MapMode.LINES && props.lines?.length) {
        props.lines.forEach((line) =>
          line.stationsPath.forEach((station) => {
            markerLocations.push({
              latitude: station.geoLocation.latitude,
              longitude: station.geoLocation.longitude,
            });
          })
        );

        return markerLocations;
      }

      if (origin) {
        markerLocations.push({
          latitude: origin.geoLocation.latitude,
          longitude: origin.geoLocation.longitude,
        });
      }
      if (destination) {
        markerLocations.push({
          latitude: destination.geoLocation.latitude,
          longitude: destination.geoLocation.longitude,
        });
      }

      return markerLocations;
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

      const markerLocations = defineMarkerLocationsBasedOnCurrentMapMode();
      fitScreenToBounds(markerLocations, currentMapMode);
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
      googleMapReference={googleMap}
      lines={props.lines}
    />
  );
};

MapContainer.defaultProps = { route: undefined, lines: undefined };

export default MapContainer;
