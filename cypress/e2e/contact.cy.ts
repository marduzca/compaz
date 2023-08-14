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

  it('shows an error notification if the user is offline', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // Go offline
        Object.defineProperty(win.navigator, 'onLine', {
          value: false,
          configurable: true,
        });
      },
    });
    Header.goToContactPage();

    Page.typeInField('Name', 'Offline');
    Page.typeInField('Email', 'offline@chavonet.com');
    Contact.typeMessage("I'm offline");

    Contact.sendMessage();
    Contact.isOfflineErrorMessageVisible();

    // Go online again
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', {
        value: true,
      });
    });
  });
});
