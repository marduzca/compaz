import { NotificationType } from './notification/Notification';

export interface Station {
  id: string;
  name: string;
  lines: string[];
  connectedStations: ConnectedStation[];
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
