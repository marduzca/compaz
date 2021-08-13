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
