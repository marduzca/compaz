import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.css';
import emailSentIcon from '../../../static/svg/email_sent.svg';
import TextBox from '../../atoms/textBox/TextBox';
import TextArea from '../../atoms/textArea/TextArea';

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
  const { t } = useTranslation();

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
        <h1>{t('Contact.HEADER')}</h1>
        <p>{t('Contact.SUBHEADER')}</p>
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
            label={t('Contact.NAME_LABEL')}
            value={props.name}
            onChange={props.onNameChange}
            required
          />
          <TextBox
            type="email"
            label={t('Contact.EMAIL_LABEL')}
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
          <TextArea
            label={t('Contact.MESSAGE_PLACEHOLDER')}
            value={props.message}
            onChange={props.onMessageChange}
            required
          />
          <button type="submit">{t('Contact.SEND_BUTTON')}</button>
        </form>
      ) : (
        <div style={{ height: formHeight }} className={styles.iconWrapper}>
          <img
            className={styles.emailSentIcon}
            src={emailSentIcon}
            alt={t('Contact.MESSAGE_SENT_ALT')}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
};

export default ContactForm;
