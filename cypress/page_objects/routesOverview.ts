const shouldShowCorrectHeaderInfo = (
  origin: string,
  destination: string,
  date: string
) => {
  cy.contains(`${origin} - ${destination}`).should('be.visible');
  cy.contains(date).should('be.visible');
};

const showEarlierRoute = () => {
  cy.contains('button', 'Earlier').scrollIntoView().click();
};

const showLaterRoute = () => {
  cy.contains('button', 'Later').scrollIntoView().click();
};

const shouldShowRouteWithGivenTimes = (
  departureTime: string,
  arrivalTime: string
) => {
  cy.get(
    `button[aria-label="Route with times ${departureTime} - ${arrivalTime}"]`
  ).should('be.visible');
};

const selectRouteWithGivenTimes = (
  departureTime: string,
  arrivalTime: string
) => {
  cy.get(
    `button[aria-label="Route with times ${departureTime} - ${arrivalTime}"]`
  ).click();
};

export default {
  shouldShowCorrectHeaderInfo,
  showEarlierRoute,
  showLaterRoute,
  shouldShowRouteWithGivenTimes,
  selectRouteWithGivenTimes,
};
