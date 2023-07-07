const withinLineSubRoute = (lineColor: string, scopedFunction: () => void) => {
  cy.get(`li[title="${lineColor} line"]`)
    .scrollIntoView()
    .within(scopedFunction);
};

const shouldShowSubRouteWithInfo = (
  lineColor: string,
  firstStation: string,
  lastStation: string,
) => {
  withinLineSubRoute(lineColor, () => {
    cy.get(`img[alt="${lineColor} line"]`).should('be.visible');
    cy.contains(firstStation).should('be.visible');
    cy.contains(lastStation).should('be.visible');
  });
};

const showIntermediateStations = () => {
  cy.get('button[title="Show intermediate stations"]').click();
};

const shouldShowStations = (stations: string[]) => {
  stations.forEach((station) => {
    cy.contains(station).should('be.visible');
  });
};

const shouldShowTransfer = () => {
  cy.get('img[alt="Transfer"]').should('be.visible');
};

export default {
  withinLineSubRoute,
  shouldShowSubRouteWithInfo,
  showIntermediateStations,
  shouldShowStations,
  shouldShowTransfer,
};
