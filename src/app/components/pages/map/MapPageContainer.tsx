import React, { useMemo } from 'react';
import MapPage from './MapPage';
import { GeoLocation, Station } from '../../domain';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';

type MapLineStation = Pick<Station, 'id' | 'name' | 'geoLocation'>;

export interface MapLine {
  color: string;
  stationsPath: MapLineStation[];
}

interface MapPageContainerProps {
  onMenuButtonClick: () => void;
}

const MapPageContainer: React.FC<MapPageContainerProps> = (props) => {
  const { stations, lines } = useFirebase();

  const mapLines = useMemo<MapLine[]>(
    () =>
      lines.map((line) => {
        const completeStationsPath: MapLineStation[] = line.stationsPath.map(
          (lineStation) => {
            const fullStation = stations.find(
              (completeStation) => completeStation.id === lineStation
            );

            return {
              id: fullStation?.id || '',
              name: fullStation?.name || '',
              geoLocation: fullStation?.geoLocation || ({} as GeoLocation),
            } as MapLineStation;
          }
        );

        return { color: line.id, stationsPath: completeStationsPath };
      }),
    [lines, stations]
  );

  return (
    <MapPage onMenuButtonClick={props.onMenuButtonClick} lines={mapLines} />
  );
};
export default MapPageContainer;
