import { NotificationType } from './organisms/notification/Notification';

export interface Station {
  id: string;
  name: string;
  lines: string[];
  geoLocation: GeoLocation;
  connectedStations: ConnectedStation[];
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface ConnectedStation {
  id: string;
  timeTo: number;
}

export interface Line {
  id: string;
  stationsPath: string[];
  connectedLines: ConnectedLine[];
}

export interface VersionData {
  version: number;
}

export interface ConnectedLine {
  id: string;
  transferTime: number;
}

export interface Route {
  subRoutes: SubRoute[];
  totalTime: number;
}

export interface SubRoute {
  stationsPath: Station[];
  totalTime: number;
  line: string;
  direction: string;
  transferTimeToNextLine?: number;
}

export interface NotificationEvent {
  type: NotificationType;
  content: string;
}

export interface UpdateAvailabilityEvent {
  serviceWorkerRegistration: ServiceWorkerRegistration;
}
