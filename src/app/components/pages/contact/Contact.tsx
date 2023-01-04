import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Introduction from './introduction/Introduction';
import ContactFormContainer from './contactForm/ContactFormContainer';
import { PAGE_TITLE_PREFIX } from '../../../App';
import PageContentContainer from '../pageContentContainer/PageContentContainer';

interface ContactProps {
  onMenuButtonClick: () => void;
}

const Contact: React.FC<ContactProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('Contact.CONTACT_TITLE')}`;
    // eslint-disable-next-line
  }, [i18n.language]);

  return (
    <PageContentContainer onMenuButtonClick={props.onMenuButtonClick}>
      <Introduction />
      <ContactFormContainer />
    </PageContentContainer>
  );
};

export default Contact;
