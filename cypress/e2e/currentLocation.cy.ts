import Map from '../page_objects/map';

describe('CurrentLocation', () => {
  const fakeCurrentLocation = () => {
    const fakeLocation = {
      latitude: 52.553444,
      longitude: 13.416418,
    };

    return {
      onBeforeLoad(browserWindow) {
        cy.stub(
          browserWindow.navigator.geolocation,
          'getCurrentPosition',
        ).callsFake((successCallback) =>
          successCallback({
            coords: {
              latitude: fakeLocation.latitude,
              longitude: fakeLocation.longitude,
            },
          }),
        );
      },
    };
  };

  it('SHOULD jump to location marker WHEN clicking on current location button', () => {
    cy.visit('/map', fakeCurrentLocation());

    cy.wait(1500);

    Map.showCurrentLocation();

    Map.shouldShowCurrentLocationMarker();
  });
});
