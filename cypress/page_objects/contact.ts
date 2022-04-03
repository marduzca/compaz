const typeMessage = (message: string) => {
  cy.get('textarea[name="Your message"]').type(message);
};

const sendMessage = () => {
  cy.contains('button', 'Send').click();
};

const isMessageSentSuccessfullyIconVisible = () => {
  cy.get('img[alt="Message sent successfully"]').should('be.visible');
};

export default {
  typeMessage,
  sendMessage,
  isMessageSentSuccessfullyIconVisible,
};
