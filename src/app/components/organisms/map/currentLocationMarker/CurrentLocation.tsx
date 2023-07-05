import React, { useEffect, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { GeoLocation, NotificationEvent } from '../../../domain';
import currentLocationIcon from '../../../../static/svg/current_location.svg';
import { ReactComponent as CurrentLocationIcon } from '../../../../static/svg/location.svg';
import useMapFitBounds from '../../../hooks/useMapFitBounds/useMapFitBounds';
import { MapMode } from '../MapContainer';
import styles from './CurrentLocation.module.css';
import { EventType, NotificationType } from '../../notification/Notification';

interface CurrentLocationMarkerProps {
  googleMapReference?: google.maps.Map;
}

const CurrentLocation: React.FC<CurrentLocationMarkerProps> = (props) => {
  const { t } = useTranslation();
  const { fitScreenToBounds } = useMapFitBounds(props.googleMapReference);

  const [currentLocation, setCurrentLocation] = useState<
    GeoLocation | undefined
  >(undefined);

  const retrieveCurrentLocation = (
    showErrorIfLocationSharingWasDenied: boolean
  ) => {
    if (!navigator.geolocation) {
      window.dispatchEvent(
        new CustomEvent(EventType.NOTIFICATION, {
          detail: {
            type: NotificationType.ERROR,
            content: t('Map.BROWSER_SUPPORT_ERROR'),
          } as NotificationEvent,
        })
      );

      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const onError = () => {
      window.dispatchEvent(
        new CustomEvent(EventType.NOTIFICATION, {
          detail: {
            type: NotificationType.ERROR,
            content: t('Map.LOCATION_ACCESS_ERROR'),
          } as NotificationEvent,
        })
      );
    };

    navigator.geolocation.getCurrentPosition(
      onSuccess,
      showErrorIfLocationSharingWasDenied ? onError : undefined
    );
  };

  const handleMoveToCurrentLocationClick = () => {
    retrieveCurrentLocation(true);

    if (currentLocation)
      fitScreenToBounds([currentLocation], MapMode.CURRENT_LOCATION);
  };

  useEffect(() => {
    retrieveCurrentLocation(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleMoveToCurrentLocationClick}
        className={styles.currentLocationButton}
        aria-label={t('Map.CURRENT_LOCATION')}
      >
        <CurrentLocationIcon />
      </button>
      {currentLocation && (
        <MarkerF
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          zIndex={2}
          icon={{
            url: currentLocationIcon,
            scaledSize: {
              height: 30,
              width: 30,
              equals: () =>
                // This is here only to make TypeScript happy, but won't have any use
                true,
            },
          }}
        />
      )}
    </>
  );
};

CurrentLocation.defaultProps = {
  googleMapReference: undefined,
};

export default CurrentLocation;
