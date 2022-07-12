import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.css';
import Introduction from './introduction/Introduction';
import ContactFormContainer from './contactForm/ContactFormContainer';
import MobileHeader from '../molecules/mobileHeader/MobileHeader';
import { TITLE_PREFIX } from '../../App';

interface ContactProps {
  onMenuButtonClick: () => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${TITLE_PREFIX} ${t('Contact.CONTACT_TITLE')}`;
    // eslint-disable-next-line
  }, []);

  return (
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
};

export default Contact;
