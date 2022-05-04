const waitForLoadingAnimationToDisappear = () => {
  cy.get('img[alt="Loading..."]').should('be.visible');

  cy.get('img[alt="Loading..."]', { timeout: 10000 }).should('not.exist');
};

const setLocalStorageItem = (key: string, value: string) => {
  cy.window().its('localStorage').invoke('setItem', key, value);
};

const removeLocalStorageItem = (key: string) => {
  cy.window().its('localStorage').invoke('removeItem', key);
};

const typeInField = (label: string, text: string) => {
  cy.get(`input[name="${label}"]`).should('be.visible').type(text);
};

export default {
  waitForLoadingAnimationToDisappear,
  setLocalStorageItem,
  removeLocalStorageItem,
  typeInField,
};
