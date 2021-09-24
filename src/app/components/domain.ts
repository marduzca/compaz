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
  connectedLines: ConnectedLine[];
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
}
