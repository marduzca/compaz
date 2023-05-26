import { MapMode } from '../../organisms/map/MapContainer';
import { GeoLocation } from '../../domain';

const useMapFitBounds = (googleMap?: google.maps.Map) => {
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
    fitScreenToBounds: (
      markerLocations: GeoLocation[],
      currentMapMode: MapMode
    ) => {
      if (googleMap) {
        const markerBounds = new window.google.maps.LatLngBounds();
        markerLocations.forEach((markerBound) => {
          markerBounds.extend({
            lat: markerBound.latitude,
            lng: markerBound.longitude,
          });
        });

        googleMap.fitBounds(markerBounds);

        applyMapPostAdjustments(currentMapMode);
      }
    },
  };
};

export default useMapFitBounds;
