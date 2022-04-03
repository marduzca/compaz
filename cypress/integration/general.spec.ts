import Header from '../page_objects/header';

describe('General features', () => {
  it('changes language successfully', () => {
    cy.visit('/');

    Header.headerShouldShowLinks('History', 'How to install', 'Contact');

    Header.changeLanguage('en');

    Header.headerShouldShowLinks('Historial', 'Como instalar', 'Contacto');

    Header.changeLanguage('es');
  });
});
