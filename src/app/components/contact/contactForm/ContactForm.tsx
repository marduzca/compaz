import React from 'react';
import styles from './ContactForm.module.css';

const ContactForm: React.FC = () => (
  <section className={styles.container}>
    <header className={styles.header}>
      <h1>Contáctame</h1>
      <p>Tienes alguna duda o quieres dejarme un comentario?</p>
    </header>
    <form className={styles.form}>
      <input type="text" placeholder="Nombre" required />
      <input type="text" placeholder="Email" required />
      <textarea placeholder="Tu mensaje..." required />
      <button type="submit">Enviar</button>
    </form>
  </section>
);

export default ContactForm;
