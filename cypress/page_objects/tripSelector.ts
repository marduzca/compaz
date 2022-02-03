const selectStations = (origin: string, destination: string) => {
  cy.get('input[name="Origin"]').type(`${origin}{downarrow}{enter}`);
  cy.get('input[name="Destination"]').type(`${destination}{downarrow}{enter}`);
};

const selectDateAndTime = (date: string, time: string) => {
  cy.get('button[title="Select departure date and time"]').click();
  cy.get('input[type="date"]').type(date);
  cy.get('input[type="time"]').type(time);
  cy.contains('button', 'Select').click();
};

const search = () => {
  cy.contains('button', 'Search').click();
};

export default { selectStations, selectDateAndTime, search };
