import React from 'react';
import { PolylineF } from '@react-google-maps/api';
import { GeoLocation } from '../../../domain';

interface StationsConnectorProps {
  fromGeoLocation: GeoLocation;
  toGeoLocation: GeoLocation;
  lineColor: string;
  positionInRoute: number;
  isIntermediatePath?: boolean;
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

StationsConnector.defaultProps = {
  isIntermediatePath: false,
};

export default StationsConnector;
