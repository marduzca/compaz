import React from 'react';
import styles from './Contact.module.css';
import Introduction from './introduction/Introduction';
import ContactFormContainer from './contactForm/ContactFormContainer';
import MobileHeader from '../molecules/mobileHeader/MobileHeader';

interface ContactProps {
  onMenuButtonClick: () => void;
}

const Contact: React.FC<ContactProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader
      onMenuButtonClick={props.onMenuButtonClick}
      hasLightBackground
    />
    <div className={styles.content}>
      <Introduction />
      <ContactFormContainer />
    </div>
  </main>
);

export default Contact;
