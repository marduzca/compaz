import Page from '../page_objects/page';

describe('General features', () => {
  it('changes language successfully', () => {
    cy.visit('/');

    Page.headerShouldShowLinks('History', 'How to install', 'Contact us');

    Page.changeLanguage('en');

    Page.headerShouldShowLinks('Historial', 'Como instalar', 'Contactanos');

    Page.changeLanguage('es');
  });
});