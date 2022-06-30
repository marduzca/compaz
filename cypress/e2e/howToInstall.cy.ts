import Header from '../page_objects/header';
import HowToInstall from '../page_objects/howToInstall';

describe('HowToInstall', () => {
  it('fills up the form and sends the message', () => {
    cy.visit('/');

    Header.goToHowToInstallPage();

    cy.contains('h1', 'How to install').should('be.visible');
    HowToInstall.shouldShowAppRunningInDevicesImage();

    HowToInstall.shouldShowCorrespondingInstallationGif(
      'Laptop',
      'Google Chrome'
    ).scrollIntoView();

    HowToInstall.selectOptionFromDropdown(
      'deviceSelectorId',
      'Android / Tablet'
    );
    HowToInstall.shouldShowCorrespondingInstallationGif(
      'Android / Tablet',
      'Google Chrome'
    );

    HowToInstall.selectOptionFromDropdown(
      'browserSelectorId',
      'Samsung Internet'
    );
    HowToInstall.shouldShowCorrespondingInstallationGif(
      'Android / Tablet',
      'Samsung Internet'
    );
  });
});
