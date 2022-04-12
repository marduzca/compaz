const withinMap = (scopedFunction: () => void) => {
  cy.get('div[aria-label="Map"]').within(scopedFunction);
};

const shouldShowStationMarker = (name: string) => {
  withinMap(() => {
    cy.get(`div[aria-label="${name}"]`, { timeout: 30000 }).should(
      'be.visible'
    );
  });
};

export default { shouldShowStationMarker };
