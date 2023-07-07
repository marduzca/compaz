import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styles from './MapPage.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';
import MapContainer from '../../organisms/map/MapContainer';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { GeoLocation, Station } from '../../domain';
import { PAGE_TITLE_PREFIX } from '../../../App';

type MapLineStation = Pick<Station, 'id' | 'name' | 'geoLocation'>;

export interface MapLine {
  color: string;
  stationsPath: MapLineStation[];
}

interface MapPageProps {
  onMenuButtonClick: () => void;
}

const MapPage: React.FC<MapPageProps> = (props) => {
  const { t } = useTranslation();
  const { stations, lines } = useFirebase();

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('Map.MAP_TITLE')}`;
    // eslint-disable-next-line
  }, [i18n.language]);

  const mapLines = useMemo<MapLine[]>(
    () =>
      lines.map((line) => {
        const completeStationsPath: MapLineStation[] = line.stationsPath.map(
          (lineStation) => {
            const fullStation = stations.find(
              (completeStation) => completeStation.id === lineStation,
            );

            return {
              id: fullStation?.id || '',
              name: fullStation?.name || '',
              geoLocation: fullStation?.geoLocation || ({} as GeoLocation),
            } as MapLineStation;
          },
        );

        return { color: line.id, stationsPath: completeStationsPath };
      }),
    [lines, stations],
  );

  return (
    <main className={styles.container}>
      <MobileHeader
        onMenuButtonClick={props.onMenuButtonClick}
        hasMenuButtonOnly
      />
      <MapContainer lines={mapLines} />
    </main>
  );
};

export default MapPage;
