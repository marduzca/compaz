import React, { useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import styles from './Map.module.css';
import { Route, Station } from '../../domain';
import Loader from '../../atoms/loader/Loader';
import OfflineMapMessage from './offlineMapMessage/OfflineMapMessage';
import StationMarker from './stationMarker/StationMarker';
import StationsConnector from './stationsConnector/StationsConnector';
import { MapLine } from '../../pages/map/MapPage';
import CurrentLocation from './currentLocationMarker/CurrentLocation';
import { MapMode } from './MapContainer';

interface MapProps {
  isLoaded: boolean;
  origin: Station | undefined;
  destination: Station | undefined;
  route: Route | undefined;
  onGoogleMapLoad: (map: google.maps.Map) => void;
  googleMapReference?: google.maps.Map;
  lines?: MapLine[];
  currentMapMode: MapMode;
}

const LA_PAZ_CENTER = { lat: -16.494363149497282, lng: -68.1572941780699 };
const DEFAULT_CONNECTOR_COLOR = '#FFFFFF';
const MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {
        saturation: '32',
      },
      {
        lightness: '-3',
      },
      {
        visibility: 'on',
      },
      {
        weight: '1.18',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        saturation: '-70',
      },
      {
        lightness: '14',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        saturation: '100',
      },
      {
        lightness: '-14',
      },
    ],
  },
];

const Map: React.FC<MapProps> = ({
  lines = undefined,
  googleMapReference = undefined,
  isLoaded,
  origin,
  destination,
  route,
  currentMapMode,
  onGoogleMapLoad,
}) => {
  const { t } = useTranslation();

  const routeMarkers = useMemo(() => {
    if (!route) {
      return null;
    }

    return (
      <>
        {route.subRoutes.map((subRoute) =>
          subRoute.stationsPath.map((station, index) => {
            if (
              station.id === origin?.id ||
              station.id === destination?.id ||
              (index > 0 && index < subRoute.stationsPath.length - 1) ||
              index === subRoute.stationsPath.length - 1
            ) {
              return null;
            }

            return (
              <div key={station.id}>
                <StationMarker
                  name={station.name}
                  geoLocation={station.geoLocation}
                  isIntermediateStation={
                    index > 0 && index < subRoute.stationsPath.length - 1
                  }
                />
              </div>
            );
          }),
        )}
        {route.subRoutes.map((subRoute) =>
          subRoute.stationsPath.map((station, index) => {
            if (index === 0) {
              return null;
            }

            return (
              <div
                key={`line_${subRoute.stationsPath[index - 1].id}_to_${
                  station.id
                }`}
              >
                <StationsConnector
                  positionInRoute={index}
                  isIntermediatePath={
                    index > 0 && index < subRoute.stationsPath.length - 1
                  }
                  fromGeoLocation={subRoute.stationsPath[index - 1].geoLocation}
                  toGeoLocation={station.geoLocation}
                  lineColor={window
                    .getComputedStyle(document.body)
                    .getPropertyValue(`--teleferico-${subRoute.line}`)}
                />
              </div>
            );
          }),
        )}
      </>
    );
  }, [destination, origin, route]);

  const lineMarkers = useMemo(() => {
    if (!lines?.length) {
      return null;
    }

    return (
      <>
        {lines.map((line) =>
          line.stationsPath.map((station) => (
            <div key={station.id}>
              <StationMarker
                name={station.name}
                geoLocation={station.geoLocation}
                isLinesMap
              />
            </div>
          )),
        )}
        {lines.map((line) =>
          line.stationsPath.map((station, index) => {
            if (index === 0) {
              return null;
            }

            return (
              <div
                key={`line_${line.stationsPath[index - 1].id}_to_${station.id}`}
              >
                <StationsConnector
                  positionInRoute={index}
                  fromGeoLocation={line.stationsPath[index - 1].geoLocation}
                  toGeoLocation={station.geoLocation}
                  lineColor={window
                    .getComputedStyle(document.body)
                    .getPropertyValue(`--teleferico-${line.color}`)}
                />
              </div>
            );
          }),
        )}
      </>
    );
  }, [lines]);

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!window.navigator.onLine && (!origin || !destination) ? (
        <OfflineMapMessage />
      ) : isLoaded ? (
        <GoogleMap
          center={LA_PAZ_CENTER}
          zoom={12}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            styles: MAP_STYLES,
          }}
          onLoad={onGoogleMapLoad}
        >
          {origin && (
            <StationMarker
              name={origin.name}
              geoLocation={origin.geoLocation}
              isOrigin
            />
          )}
          {destination && (
            <StationMarker
              name={destination.name}
              geoLocation={destination.geoLocation}
              isDestination
            />
          )}
          {origin && destination && !route && (
            <StationsConnector
              positionInRoute={0}
              fromGeoLocation={origin.geoLocation}
              toGeoLocation={destination.geoLocation}
              lineColor={DEFAULT_CONNECTOR_COLOR}
            />
          )}
          {currentMapMode !== MapMode.ORIGIN_AND_DESTINATION && (
            <CurrentLocation googleMapReference={googleMapReference} />
          )}
          {route && routeMarkers}
          {lines?.length && lineMarkers}
        </GoogleMap>
      ) : (
        <Loader ariaLabel={t('Map.LOADING_MAP')} />
      )}
    </div>
  );
};

export default Map;
