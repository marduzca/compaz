import React from 'react';
import { GoogleMap, MarkerF, PolylineF } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import stationMarker from '../../../static/svg/station_marker.svg';
import originMarker from '../../../static/svg/origin_marker.svg';
import destinationMarker from '../../../static/svg/destination_marker.svg';
import styles from './Map.module.css';
import { GeoLocation, Route, Station } from '../../domain';

interface StationMarkerProps {
  name: string;
  geoLocation: GeoLocation;
  isMobile: boolean;
  isOrigin?: boolean;
  isDestination?: boolean;
  isIntermediateStation: boolean;
}

const StationMarker: React.FC<StationMarkerProps> = (props) => {
  const getCorrespondingMarker = () => {
    if (props.isOrigin) {
      return originMarker;
    }

    if (props.isDestination) {
      return destinationMarker;
    }

    return stationMarker;
  };

  return (
    <MarkerF
      position={{
        lat: props.geoLocation.latitude,
        lng: props.geoLocation.longitude,
      }}
      icon={{
        url: getCorrespondingMarker(),
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
      label={
        !props.isIntermediateStation
          ? {
              text: props.name.toUpperCase(),
              fontWeight: '900',
              fontSize: '1rem',
              color: '#4f4f4f',
              className: styles.markerLabel,
            }
          : undefined
      }
    />
  );
};

StationMarker.defaultProps = {
  isOrigin: false,
  isDestination: false,
};

interface StationsConnectorProps {
  fromGeoLocation: GeoLocation;
  toGeoLocation: GeoLocation;
  lineColor: string;
  positionInRoute: number;
  isIntermediatePath: boolean;
}

const StationsConnector: React.FC<StationsConnectorProps> = (props) => (
  <>
    <PolylineF
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
        zIndex: 100 - props.positionInRoute,
        icons: props.isIntermediatePath
          ? [
              {
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: '#FFFFFF',
                  fillOpacity: 1.0,
                  strokeColor: '#000000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                },
              },
            ]
          : undefined,
      }}
    />
    <PolylineF
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
              isIntermediateStation={false}
              isOrigin
            />
          )}
          {props.destination && (
            <StationMarker
              name={props.destination.name}
              geoLocation={props.destination.geoLocation}
              isMobile={props.isMobile}
              isIntermediateStation={false}
              isDestination
            />
          )}
          {props.origin && props.destination && !props.route && (
            <StationsConnector
              positionInRoute={0}
              isIntermediatePath={false}
              fromGeoLocation={props.origin.geoLocation}
              toGeoLocation={props.destination.geoLocation}
              lineColor={DEFAULT_CONNECTOR_COLOR}
            />
          )}

          {props.route &&
            props.route.subRoutes.map((subRoute) =>
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
                      isMobile={props.isMobile}
                      isIntermediateStation={
                        index > 0 && index < subRoute.stationsPath.length - 1
                      }
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
                      positionInRoute={index}
                      isIntermediatePath={
                        index > 0 && index < subRoute.stationsPath.length - 1
                      }
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
