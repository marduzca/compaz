import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { Line, Station, Version } from '../../domain';

export const stationConverter: FirestoreDataConverter<Station> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Station {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      lines: data.lines,
      geoLocation: data.geoLocation,
      connectedStations: data.connectedStations,
    } as Station;
  },
};

export const lineConverter: FirestoreDataConverter<Line> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Line {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      stationsPath: data.stationsPath,
      connectedLines: data.connectedLines,
    } as Line;
  },
};

export const versionConverter: FirestoreDataConverter<Version> = {
  toFirestore() {
    return {};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Version {
    const data = snapshot.data(options);
    return {
      version: data.version,
    } as Version;
  },
};
