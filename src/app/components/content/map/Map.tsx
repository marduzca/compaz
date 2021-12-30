import React from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import stationMarker from '../../../static/img/station_marker.svg';
import styles from './Map.module.css';
import { GeoLocation, Route, Station } from '../../domain';

interface StationMarkerProps {
  name: string;
  geoLocation: GeoLocation;
  isMobile: boolean;
}

const StationMarker: React.FC<StationMarkerProps> = (props) => (
  <Marker
    position={{
      lat: props.geoLocation.latitude - 0.00001, // To try to align marker with polyline
      lng: props.geoLocation.longitude,
    }}
    icon={{
      url: stationMarker,
      scaledSize: props.isMobile
        ? {
            height: 40,
            width: 40,
            equals: () =>
              // This is here only to make TypeScript happy, but won't have any use
              true,
          }
        : undefined,
      labelOrigin: {
        x: props.isMobile ? 17 : 21,
        y: -15,
        equals: () =>
          // This is here only to make TypeScript happy, but won't have any use
          true,
      },
    }}
    label={{
      text: props.name.toUpperCase(),
      fontWeight: '900',
      fontSize: '1rem',
      color: '#4f4f4f',
      className: styles.markerLabel,
    }}
  />
);

interface StationsConnectorProps {
  fromGeoLocation: GeoLocation;
  toGeoLocation: GeoLocation;
  lineColor: string;
}

const StationsConnector: React.FC<StationsConnectorProps> = (props) => (
  <>
    <Polyline
      path={[
        {
          lat: props.fromGeoLocation.latitude,
          lng: props.fromGeoLocation.longitude,
        },
        {
          lat: props.toGeoLocation.latitude,
          lng: props.toGeoLocation.longitude,
        },
      ]}
      options={{
        strokeColor: props.lineColor,
        strokeWeight: 5,
        zIndex: 2,
      }}
    />
    <Polyline
      path={[
        {
          lat: props.fromGeoLocation.latitude,
          lng: props.fromGeoLocation.longitude,
        },
        {
          lat: props.toGeoLocation.latitude,
          lng: props.toGeoLocation.longitude,
        },
      ]}
      options={{
        strokeColor: '#000000',
        strokeWeight: 7,
        strokeOpacity: 0.8,
        zIndex: 1,
      }}
    />
  </>
);

interface MapProps {
  isLoaded: boolean;
  origin: Station | undefined;
  destination: Station | undefined;
  route: Route | undefined;
  isMobile: boolean;
  onGoogleMapLoad: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = (props) => {
  const { t } = useTranslation();
  const LA_PAZ_CENTER = { lat: -16.494363149497282, lng: -68.1572941780699 };
  const DEFAULT_CONNECTOR_COLOR = '#FFFFFF';

  const mapStyles = [
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

  return (
    <div className={styles.container}>
      {props.isLoaded ? (
        <GoogleMap
          center={LA_PAZ_CENTER}
          zoom={12}
          mapContainerClassName={styles.map}
          clickableIcons={false}
          options={{
            disableDefaultUI: true,
            minZoom: 11,
            styles: mapStyles,
          }}
          onLoad={props.onGoogleMapLoad}
        >
          {props.origin && (
            <StationMarker
              name={props.origin.name}
              geoLocation={props.origin.geoLocation}
              isMobile={props.isMobile}
            />
          )}
          {props.destination && (
            <StationMarker
              name={props.destination.name}
              geoLocation={props.destination.geoLocation}
              isMobile={props.isMobile}
            />
          )}
          {props.origin && props.destination && !props.route && (
            <StationsConnector
              fromGeoLocation={props.origin.geoLocation}
              toGeoLocation={props.destination.geoLocation}
              lineColor={DEFAULT_CONNECTOR_COLOR}
            />
          )}

          {props.route &&
            props.route.subRoutes.map((subRoute) =>
              subRoute.stationsPath.map((station, index) => {
                if (index === subRoute.stationsPath.length - 1) {
                  return null;
                }

                return (
                  <div key={station.id}>
                    <StationMarker
                      name={station.name}
                      geoLocation={station.geoLocation}
                      isMobile={props.isMobile}
                    />
                  </div>
                );
              })
            )}
          {props.route &&
            props.route.subRoutes.map((subRoute) =>
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
                      fromGeoLocation={
                        subRoute.stationsPath[index - 1].geoLocation
                      }
                      toGeoLocation={station.geoLocation}
                      lineColor={window
                        .getComputedStyle(document.body)
                        .getPropertyValue(`--teleferico-${subRoute.line}`)}
                    />
                  </div>
                );
              })
            )}
        </GoogleMap>
      ) : (
        <span aria-label={t('LOADING_MAP')} className={styles.loader} />
      )}
    </div>
  );
};

export default Map;
