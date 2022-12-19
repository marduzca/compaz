import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
  }, []);

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
        <h2 className={styles.columnHeading}>¿Por qué compaz?</h2>
        <div className={styles.textBlock}>
          <section>
            <h3>Simple</h3>
            <p>
              Fácil y al alcance de la mano. Descubre tu ruta con solo un par de
              clicks en vez de estar calculando manualmente.
            </p>
          </section>
          <section>
            <h3>Ahorra</h3>
            <p>
              La aplicación funciona incluso estando offline. ¡No gastes tus
              datos móviles! La primera vez que utilices la aplicación, los
              archivos más importantes serán guardados en tu dispositivo y esto
              permitirá que la puedas volver a usar sin necesitar internet.
            </p>
          </section>
          <section>
            <h3>Tourist-friendly</h3>
            <p>¡Perfecto para turistas! Disponible también 100% en inglés.</p>
          </section>
          <section>
            <h3>Accesible</h3>
            <p>
              Desarrollada con mucho cuidado para poder garantizar el uso a
              usuarios que requieran de lectores de pantalla o solo usen el
              teclado para navegar el internet.
            </p>
          </section>
        </div>
      </section>
    </PageContentContainer>
  );
};

export default About;
