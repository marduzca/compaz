import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { PAGE_TITLE_PREFIX } from '../../../App';
import styles from './About.module.css';
import PageContentContainer from '../pageContentContainer/PageContentContainer';
import { NavigationLink } from '../../organisms/menu/Menu';

interface AboutProps {
  onMenuButtonClick: () => void;
}

const About: React.FC<AboutProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('About.ABOUT_TITLE')}`;
    // eslint-disable-next-line
  }, [i18n.language]);

  return (
    <PageContentContainer
      wrapperClassName={styles.container}
      onMenuButtonClick={props.onMenuButtonClick}
    >
      <section className={styles.whatSection}>
        <h2 className={styles.columnHeading}>
          {t('About.WhatSection.HEADING')}
        </h2>
        <div>
          <p>
            <Trans i18nKey="About.WhatSection.PARAGRAPH">
              About.WhatSection.PARAGRAPH
              <span className={styles.compaz} />
            </Trans>
          </p>
          <ul>
            <li>{t('About.WhatSection.WHAT_ITEM_1')}</li>
            <li>{t('About.WhatSection.WHAT_ITEM_2')}</li>
            <li>{t('About.WhatSection.WHAT_ITEM_3')}</li>
            <li>
              <Trans i18nKey="About.WhatSection.WHAT_ITEM_4">
                About.WhatSection.WHAT_ITEM_4
                <Link to={NavigationLink.HOW_TO_INSTALL} />
              </Trans>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className={styles.columnHeading}>
          {t('About.WhySection.HEADING')}
        </h2>
        <div className={styles.textBlock}>
          <section>
            <h3>{t('About.WhySection.SIMPLE_HEADING')}</h3>
            <p>{t('About.WhySection.SIMPLE_PARAGRAPH')}</p>
          </section>
          <section>
            <h3>{t('About.WhySection.SAVE_HEADING')}</h3>
            <p>{t('About.WhySection.SAVE_PARAGRAPH')}</p>
          </section>
          <section>
            <h3>{t('About.WhySection.TOURIST_HEADING')}</h3>
            <p>{t('About.WhySection.TOURIST_PARAGRAPH')}</p>
          </section>
          <section>
            <h3>{t('About.WhySection.ACCESSIBLE_HEADING')}</h3>
            <p>{t('About.WhySection.ACCESSIBLE_PARAGRAPH')}</p>
          </section>
        </div>
      </section>
    </PageContentContainer>
  );
};

export default About;
