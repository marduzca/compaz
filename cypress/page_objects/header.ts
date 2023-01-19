const changeLanguage = (currentLanguage: string) => {
  cy.get(
    `button[title="${
      currentLanguage === 'en' ? 'Change language' : 'Cambiar idioma'
    }"]`
  ).click();
};

const headerShouldShowLinks = (howToInstall: string, contactUs: string) => {
  cy.contains('a', howToInstall).should('be.visible');
  cy.contains('a', contactUs).should('be.visible');
};

const goToMapPage = () => {
  cy.contains('a', 'Map').click();
};

const goToContactPage = () => {
  cy.contains('a', 'Contact').click();
};

const goToHowToInstallPage = () => {
  cy.contains('a', 'How to install').click();
};

export default {
  changeLanguage,
  headerShouldShowLinks,
  goToMapPage,
  goToContactPage,
  goToHowToInstallPage,
};
