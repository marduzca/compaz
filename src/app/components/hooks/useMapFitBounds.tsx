import { MapMode } from '../organisms/map/MapContainer';
import LatLngBounds = google.maps.LatLngBounds;
import Map = google.maps.Map;

const useMapFitBounds = (googleMap?: Map) => {
  const applyMapPostAdjustments = (currentMapMode: MapMode) => {
    if (googleMap) {
      google.maps.event.addListenerOnce(googleMap, 'idle', () => {
        if (currentMapMode === MapMode.ROUTE) {
          if (window.innerHeight > window.innerWidth) {
            googleMap.panBy(0, window.innerHeight * 0.2);
          } else {
            googleMap.panBy(
              window.innerWidth * -0.1,
              window.innerHeight * -0.03
            );
          }
        }

        if (currentMapMode === MapMode.LINES) {
          if (window.innerHeight > window.innerWidth) {
            googleMap.setZoom(13);
          } else {
            googleMap.panBy(0, window.innerHeight * -0.03);
          }
        }
      });
    }
  };

  return {
    fitScreenToMarkerBounds: (
      markerBounds: LatLngBounds,
      currentMapMode: MapMode
    ) => {
      if (googleMap) {
        googleMap.fitBounds(markerBounds);

        applyMapPostAdjustments(currentMapMode);
      }
    },
  };
};

export default useMapFitBounds;
