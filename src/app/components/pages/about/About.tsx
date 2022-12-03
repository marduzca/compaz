import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
        <h2 className={styles.columnHeading}>¿Qué es compaz?</h2>
        <div>
          <p>
            Una aplicación web para transportarse en el teleférico de la ciudad
            de La Paz, Bolivia. <span className={styles.compaz}>compaz </span>
            te ofrece lo siguiente:
          </p>
          <ul>
            <li>
              Te ayuda a saber la ruta óptima que necesitas tomar para llegar a
              tu destino.
            </li>
            <li>
              También te dará un estimado del tiempo necesario para esa ruta. Se
              debe tomar en cuenta que el estimado de tiempo no incluye el
              tiempo de fila (si es el caso). Los estimados asumen una ruta
              normal en la que los cambios de línea se realizan a paso promedio
              y sin filas.
            </li>
            <li>
              El mapa integrado te ayudará a visualizar la ruta que se tomará
              para saber de qué lugar de la ciudad se parte y a cual se llega.
            </li>
            <li>
              La aplicación puede ser instalada fácilmente en cualquier
              dispositivo como si se tratara de una aplicación nativa. Para
              saber cómo, ve a nuestra página de{' '}
              <Link to={NavigationLink.HOW_TO_INSTALL}>Como instalar</Link>.
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
