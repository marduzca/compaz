# Glossary

- **Station**: a teleférico stop, with a geolocation, the lines serving it, and `connectedStations` (neighbours with `timeTo` in minutes). Source: `data/stations.json`.
- **Line**: a teleférico line identified by colour (`LineColor`), with an ordered `stationsPath` and `connectedLines` (other lines with a `transferTime` in minutes). Source: `data/lines.json`.
- **Route**: a full trip between two stations, made of **SubRoutes** (one per line ridden), with `totalTime` and `price`.
- **SubRoute**: the leg of a Route on a single line, with its `direction` and the `transferTimeToNextLine`.
- **Transfer**: changing from one line to another at a shared station. Queuing time is not included in estimates.
