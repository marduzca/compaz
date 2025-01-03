import React, { useCallback, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';
import { useNavigation } from '../../providers/navigation/NavigationProvider';
import { GeoLocation, Route } from '../../domain';
import useMediaQuery from '../../hooks/useMediaQuery';
import { MapLine } from '../../pages/map/MapPage';
import useMapFitBounds from '../../hooks/useMapFitBounds/useMapFitBounds';

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

const MapContainer: React.FC<MapContainerProps> = ({
  route = undefined,
  lines = undefined,
}) => {
  const isMobile = useMediaQuery(); // Only used to adjust bounds if the screen dynamically changes size to be mobile
  const { origin, destination } = useNavigation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY || 'fake-key',
    language: navigator.language,
  });

  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined,
  );

  const [currentMapMode, setCurrentMapMode] = useState<MapMode>(
    MapMode.ORIGIN_AND_DESTINATION,
  );

  const { fitScreenToBounds } = useMapFitBounds(googleMap);

  const defineMarkerLocationsBasedOnCurrentMapMode =
    useCallback((): GeoLocation[] => {
      const markerLocations: GeoLocation[] = [];

      if (currentMapMode === MapMode.ROUTE && route) {
        route.subRoutes.forEach((subRoute) => {
          subRoute.stationsPath.forEach((station) => {
            markerLocations.push({
              latitude: station.geoLocation.latitude,
              longitude: station.geoLocation.longitude,
            });
          });
        });

        return markerLocations;
      }

      if (currentMapMode === MapMode.LINES && lines?.length) {
        lines.forEach((line) =>
          line.stationsPath.forEach((station) => {
            markerLocations.push({
              latitude: station.geoLocation.latitude,
              longitude: station.geoLocation.longitude,
            });
          }),
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
    }, [currentMapMode, destination, origin, lines, route]);

  useEffect(() => {
    if (route) {
      setCurrentMapMode(MapMode.ROUTE);

      return;
    }

    if (lines?.length) {
      setCurrentMapMode(MapMode.LINES);

      return;
    }

    if (origin || destination) {
      setCurrentMapMode(MapMode.ORIGIN_AND_DESTINATION);
    }
  }, [destination, origin, lines?.length, route]);

  useEffect(() => {
    if (isLoaded && googleMap) {
      if (!lines?.length && !route && !origin && !destination) {
        googleMap.setZoom(12);

        return;
      }

      const markerLocations = defineMarkerLocationsBasedOnCurrentMapMode();
      fitScreenToBounds(markerLocations, currentMapMode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    route,
    lines,
    origin,
    destination,
    googleMap,
    isLoaded,
    isMobile,
    currentMapMode,
  ]);

  return (
    <Map
      currentMapMode={currentMapMode}
      isLoaded={isLoaded}
      origin={origin}
      destination={destination}
      route={route}
      onGoogleMapLoad={setGoogleMap}
      googleMapReference={googleMap}
      lines={lines}
    />
  );
};

export default MapContainer;
