import React from 'react';
import styles from './Contact.module.css';
import Introduction from './introduction/Introduction';
import ContactForm from './contactForm/ContactForm';

const Contact: React.FC = () => (
  <main className={styles.container}>
    <section className={styles.content}>
      <Introduction />
      <ContactForm />
    </section>
  </main>
);

export default Contact;
