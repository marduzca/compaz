import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PAGE_TITLE_PREFIX } from '../../App';
import styles from '../contact/Contact.module.css';
import MobileHeader from '../molecules/mobileHeader/MobileHeader';

interface AboutProps {
  onMenuButtonClick: () => void;
}

const About: React.FC<AboutProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t('About.ABOUT_TITLE')}`;
    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.container}>
      <MobileHeader
        onMenuButtonClick={props.onMenuButtonClick}
        hasLightBackground
      />
      <div className={styles.content}>
        <div>
          <h2>Que es compaz?</h2>
          <section style={{ display: 'grid', rowGap: '1rem' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              odio sollicitudin, tempus metus at, efficitur nibh. Ut ultricies
              tempus felis. Phasellus diam erat, ultrices quis purus eget,
              dictum porttitor est. Vivamus non aliquet est. In tristique
              placerat tincidunt.
            </p>
            <p>
              Integer non rutrum purus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Suspendisse
              risus tortor, vulputate nec turpis quis, facilisis volutpat erat.
              Praesent sed ligula facilisis, auctor lacus nec, pellentesque
              justo. Mauris nec ullamcorper odio, sit amet mattis ante.
            </p>
            <p>
              Integer non rutrum purus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Suspendisse
              risus tortor, vulputate nec turpis quis, facilisis volutpat erat.
              Praesent sed ligula facilisis, auctor lacus nec, pellentesque
              justo. Mauris nec ullamcorper odio, sit amet mattis ante.
            </p>
          </section>
        </div>
        <div>
          <h2>Por que compaz?</h2>
          <section style={{ display: 'grid', rowGap: '1rem' }}>
            <p>
              Integer non rutrum purus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Suspendisse
              risus tortor, vulputate nec turpis quis, facilisis volutpat erat.
              Praesent sed ligula facilisis, auctor lacus nec, pellentesque
              justo. Mauris nec ullamcorper odio, sit amet mattis ante.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              odio sollicitudin, tempus metus at, efficitur nibh. Ut ultricies
              tempus felis. Phasellus diam erat, ultrices quis purus eget,
              dictum porttitor est. Vivamus non aliquet est. In tristique
              placerat tincidunt.
            </p>
            <p>
              Integer non rutrum purus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Suspendisse
              risus tortor, vulputate nec turpis quis, facilisis volutpat erat.
              Praesent sed ligula facilisis, auctor lacus nec, pellentesque
              justo. Mauris nec ullamcorper odio, sit amet mattis ante.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default About;
