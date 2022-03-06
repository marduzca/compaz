import React from 'react';
import styles from './Contact.module.css';
import Introduction from './introduction/Introduction';

const Contact: React.FC = () => (
  <main className={styles.container}>
    <section className={styles.content}>
      <Introduction />
    </section>
  </main>
);

export default Contact;
