import Page from '../page_objects/page';
import Header from '../page_objects/header';
import Contact from '../page_objects/contact';

describe('Contact', () => {
  it('fills up the form and sends the message', () => {
    cy.visit('/');
    Page.setLocalStorageItem('disableMessageStorage', 'true');

    Header.goToContactPage();

    Page.typeInField('Name', 'Roberto Gomez Bolañoz');
    Page.typeInField('Email', 'chespirito@chavonet.com');
    Contact.typeMessage('Fue sin querer queriendo');

    Contact.sendMessage();
    Contact.isMessageSentSuccessfullyIconVisible();

    Page.removeLocalStorageItem('disableMessageStorage');
  });

  // TODO: Test error notification if offline, once Cypress supports simulating offline mode
});
