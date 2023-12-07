const withinMap = (scopedFunction: () => void) => {
  cy.get('div[aria-label="Map"]').parent().within(scopedFunction);
};

const showCurrentLocation = () => {
  cy.get(`button[aria-label="Show current location"]`)
    .should('be.visible')
    .click();
};

const shouldShowStationMarker = (name: string) => {
  withinMap(() => {
    cy.contains(name).should('be.visible');
  });
};

const shouldShowCurrentLocationMarker = () => {
  withinMap(() => {
    cy.get(`div[aria-label="Current location"]`).should('be.visible');
  });
};

export default {
  shouldShowStationMarker,
  showCurrentLocation,
  shouldShowCurrentLocationMarker,
};
