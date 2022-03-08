import React from 'react';
import styles from './Contact.module.css';
import Introduction from './introduction/Introduction';
import ContactFormContainer from './contactForm/ContactFormContainer';

const Contact: React.FC = () => (
  <main className={styles.container}>
    <div className={styles.content}>
      <Introduction />
      <ContactFormContainer />
    </div>
  </main>
);

export default Contact;
