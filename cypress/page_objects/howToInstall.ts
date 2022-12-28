const shouldShowAppRunningInDevicesImage = () => {
  cy.get(
    'img[alt="Different devices (Laptop, tablet and mobile) running the compaz app"]'
  ).should('be.visible');
};

const shouldShowCorrespondingInstallationGif = (
  device: string,
  browser: string
) =>
  cy
    .get(
      `img[alt="Animation showing installations process on a ${device} using ${browser}."]`
    )
    .should('be.visible');

const selectOptionFromDropdown = (label: string, option: string) => {
  cy.get(`div[role="combobox"][aria-labelledby="${label}"]`)
    .scrollIntoView()
    .should('be.visible')
    .click();

  cy.get('li[role="option"]').contains(option).should('be.visible').click();
};

export default {
  shouldShowAppRunningInDevicesImage,
  shouldShowCorrespondingInstallationGif,
  selectOptionFromDropdown,
};
