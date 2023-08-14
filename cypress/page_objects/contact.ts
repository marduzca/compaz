const typeMessage = (message: string) => {
  cy.get('textarea[name="Your message"]').type(message);
};

const sendMessage = () => {
  cy.contains('button', 'Send').click();
};

const isMessageSentSuccessfullyIconVisible = () => {
  cy.get('img[alt="Message sent successfully"]').should('be.visible');
};

const isOfflineErrorMessageVisible = () => {
  cy.get('div[role="alert"][aria-label="Error notification"]')
    .contains(
      'This functionality is only available while online. Connect to a network and try again.',
    )
    .should('be.visible');
};

export default {
  typeMessage,
  sendMessage,
  isMessageSentSuccessfullyIconVisible,
  isOfflineErrorMessageVisible,
};
