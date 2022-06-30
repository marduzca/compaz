const changeLanguage = (currentLanguage: string) => {
  cy.get(
    `button[title="${
      currentLanguage === 'en' ? 'Change language' : 'Cambiar idioma'
    }"]`
  ).click();
};

const headerShouldShowLinks = (
  history: string,
  howToInstall: string,
  contactUs: string
) => {
  cy.contains('a', history).should('be.visible');
  cy.contains('a', howToInstall).should('be.visible');
  cy.contains('a', contactUs).should('be.visible');
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
  goToContactPage,
  goToHowToInstallPage,
};
