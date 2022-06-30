import Header from '../page_objects/header';

describe('HowToInstall', () => {
  it('fills up the form and sends the message', () => {
    cy.visit('/');

    Header.goToHowToInstallPage();

    // Check we see header
    cy.contains('h1', 'How to install').should('be.visible');
    // Check we see benefits + image
    cy.get(
      'img[alt="Different devices (Laptop, tablet and mobile) running the compaz app"]'
    ).should('be.visible');

    // Check we see desktop gif
    cy.get(
      'img[alt="Animation showing installations process on a Laptop using Google Chrome."]'
    )
      .should('be.visible')
      .scrollIntoView();

    // Change device to mobile
    cy.get('button[role="combobox"][aria-labelledby="deviceSelectorId"]')
      .should('be.visible')
      .click();
    cy.get('li[role="option"]')
      .contains('Android / Tablet')
      .should('be.visible')
      .click();
    // Check we see mobile gif
    cy.get(
      'img[alt="Animation showing installations process on a Android / Tablet using Google Chrome."]'
    ).should('be.visible');

    // Check options in browser
    cy.get('button[role="combobox"][aria-labelledby="browserSelectorId"]')
      .should('be.visible')
      .click();
    cy.get('li[role="option"]').should('be.visible').should('have.length', 3);
    cy.get('li[role="option"]')
      .contains('Samsung Internet')
      .should('be.visible')
      .click();

    cy.get(
      'img[alt="Animation showing installations process on a Android / Tablet using Samsung Internet."]'
    ).should('be.visible');
  });
});
