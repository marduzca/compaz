import Page from './page';

const selectStations = (origin: string, destination: string) => {
  Page.typeInField('Origin', origin);
  Page.typeInField('Origin', '{downarrow}{enter}');
  Page.typeInField('Destination', destination);
  Page.typeInField('Destination', '{downarrow}{enter}');
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
