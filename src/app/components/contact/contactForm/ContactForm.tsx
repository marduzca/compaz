import React, { useMemo, useRef } from 'react';
import styles from './ContactForm.module.css';
import emailSentIcon from '../../../static/img/email_sent.svg';
import TextBox from '../../atoms/textBox/TextBox';

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
  wasMessageSuccessfullySent: boolean;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onMessageChange: (message: string) => void;
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const vampireSlayerRef = useRef<HTMLInputElement>(null);

  const formHeight = useMemo(
    () => formRef.current?.clientHeight,
    // eslint-disable-next-line
    [props.wasMessageSuccessfullySent]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Contáctame</h1>
        <p>Tienes alguna duda o quieres dejarme un comentario?</p>
      </header>
      {!props.wasMessageSuccessfullySent ? (
        <form
          className={styles.form}
          onSubmit={(event) => {
            if (
              vampireSlayerRef.current &&
              vampireSlayerRef.current.value.length === 0 // Verify if the input to slay bots has been filled
            ) {
              props.onSubmit();
            }
            event.preventDefault();
          }}
          ref={formRef}
        >
          <TextBox
            label="Name"
            value={props.name}
            onChange={props.onNameChange}
            required
          />
          <TextBox
            type="email"
            label="Email"
            value={props.email}
            onChange={props.onEmailChange}
            required
          />
          <input // Input to kill bots
            aria-label="Url"
            type="text"
            ref={vampireSlayerRef}
            name="Url"
            placeholder="Url"
            className={styles.vampireSlayer}
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
      ) : (
        <div style={{ height: formHeight }} className={styles.iconWrapper}>
          <img
            className={styles.emailSentIcon}
            src={emailSentIcon}
            alt="Email successfully sent!"
          />
        </div>
      )}
    </section>
  );
};

export default ContactForm;
