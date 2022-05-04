import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { Line, Station, VersionData } from '../domain';

export const stationConverter: FirestoreDataConverter<Station> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Station {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      lines: data.lines,
      geoLocation: data.geoLocation,
      connectedStations: data.connectedStations,
    };
  },
};

export const lineConverter: FirestoreDataConverter<Line> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Line {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      stationsPath: data.stationsPath,
      connectedLines: data.connectedLines,
    };
  },
};

export const versionDataConverter: FirestoreDataConverter<VersionData> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): VersionData {
    const data = snapshot.data(options);
    return {
      version: data.version,
    };
  },
};
