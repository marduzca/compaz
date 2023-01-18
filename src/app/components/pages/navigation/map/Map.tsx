import React, { useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import styles from './Map.module.css';
import { Route, Station } from '../../../domain';
import Loader from '../../../atoms/loader/Loader';
import OfflineMapMessage from './offlineMapMessage/OfflineMapMessage';
import StationMarker from './stationMarker/StationMarker';
import StationsConnector from './stationsConnector/StationsConnector';
import { MapLine } from '../../map/MapPageContainer';

interface MapProps {
  isLoaded: boolean;
  origin: Station | undefined;
  destination: Station | undefined;
  route: Route | undefined;
  onGoogleMapLoad: (map: google.maps.Map) => void;
  lines?: MapLine[];
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

const Map: React.FC<MapProps> = (props) => {
  const { t } = useTranslation();

  const routeMarkers = useMemo(() => {
    if (!props.route) {
      return null;
    }

    return (
      <>
        {props.route.subRoutes.map((subRoute) =>
          subRoute.stationsPath.map((station, index) => {
            if (
              station.id === props.origin?.id ||
              station.id === props.destination?.id ||
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
          })
        )}
        {props.route.subRoutes.map((subRoute) =>
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
          })
        )}
      </>
    );
  }, [props.destination, props.origin, props.route]);

  const lineMarkers = useMemo(() => {
    if (!props.lines?.length) {
      return null;
    }

    return (
      <>
        {props.lines.map((line) =>
          line.stationsPath.map((station) => (
            <div key={station.id}>
              <StationMarker
                name={station.name}
                geoLocation={station.geoLocation}
                isLinesMap
              />
            </div>
          ))
        )}
        {props.lines.map((line) =>
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
          })
        )}
      </>
    );
  }, [props.lines]);

  return (
    <div className={styles.container}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!window.navigator.onLine && (!props.origin || !props.destination) ? (
        <OfflineMapMessage />
      ) : props.isLoaded ? (
        <GoogleMap
          center={LA_PAZ_CENTER}
          zoom={12}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            minZoom: 11,
            styles: MAP_STYLES,
          }}
          onLoad={props.onGoogleMapLoad}
        >
          {props.origin && (
            <StationMarker
              name={props.origin.name}
              geoLocation={props.origin.geoLocation}
              isOrigin
            />
          )}
          {props.destination && (
            <StationMarker
              name={props.destination.name}
              geoLocation={props.destination.geoLocation}
              isDestination
            />
          )}
          {props.origin && props.destination && !props.route && (
            <StationsConnector
              positionInRoute={0}
              fromGeoLocation={props.origin.geoLocation}
              toGeoLocation={props.destination.geoLocation}
              lineColor={DEFAULT_CONNECTOR_COLOR}
            />
          )}

          {props.route && routeMarkers}
          {props.lines?.length && lineMarkers}
        </GoogleMap>
      ) : (
        <Loader ariaLabel={t('Map.LOADING_MAP')} />
      )}
    </div>
  );
};

Map.defaultProps = { lines: undefined };

export default Map;
