import React from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onMessageChange: (message: string) => void;
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => (
  <section className={styles.container}>
    <header className={styles.header}>
      <h1>Contáctame</h1>
      <p>Tienes alguna duda o quieres dejarme un comentario?</p>
    </header>
    <form
      className={styles.form}
      onSubmit={(event) => {
        props.onSubmit();
        event.preventDefault();
      }}
    >
      <input
        aria-label="Name"
        type="text"
        placeholder="Nombre"
        required
        value={props.name}
        onChange={(event) => props.onNameChange(event.target.value)}
      />
      <input
        aria-label="Email"
        type="text"
        placeholder="Email"
        required
        value={props.email}
        onChange={(event) => props.onEmailChange(event.target.value)}
      />
      <textarea
        aria-label="Message"
        placeholder="Tu mensaje..."
        required
        value={props.message}
        onChange={(event) => props.onMessageChange(event.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  </section>
);

export default ContactForm;
