import React from 'react';
import { useTranslation } from 'react-i18next';
import sketch from '../../../../static/img/sketch.png';
import { ReactComponent as GithubIcon } from '../../../../static/svg/github.svg';
import { ReactComponent as LinkedinIcon } from '../../../../static/svg/linkedin.svg';
import styles from './Introduction.module.css';

const Introduction: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.sketchWrapper}>
        <img
          className={styles.sketch}
          src={sketch}
          alt={t('Contact.SKETCH_ALT')}
          loading="lazy"
        />
      </div>
      <div className={styles.text}>
        <p>
          Hola, mi nombre es Miguel Arduz y soy el creador de
          <span className={styles.compaz}> compaz</span>. Nacido y crecido en la
          ciudad de La Paz, me mudé a Alemania a los 19 años para realizar mis
          estudios universitarios en la Universidad de Mannheim. Actualmente
          vivo en Berlín y trabajo como consultor/programador en la consultora
          Thoughtworks.
        </p>
        <p>
          La idea de <span className={styles.compaz}> compaz</span> surge de mi
          gran gusto por el teleférico y lo complicado que me parece manejarse
          en él cada vez que estoy de visita en La Paz. Desarrollé la aplicación
          dedicando mucho tiempo y esfuerzo para crear no solo algo que sirva,
          sino también un producto de alta calidad. Me apasiona especialmente la
          inclusión, por ende hice un esfuerzo extra en hacer a
          <span className={styles.compaz}> compaz</span> accesible, de forma que
          usuarios que requieran lectores de pantalla o solo usen el teclado no
          deberían tener problemas para usar la aplicación. Este trabajo
          representa mi regalo de agradecimiento por todo lo que me dió mi
          ciudad.
        </p>
        <p>
          Espero que les guste y sobre todo, que les sea útil. Cualquier duda o
          comentario no duden en contactarme a través del formulario en esta
          misma página o por mis redes sociales.
        </p>
      </div>
      <div className={styles.socialNetworks}>
        <a
          href="https://github.com/marduzca"
          aria-label={t('Contact.GITHUB_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/miguelarduz/"
          aria-label={t('Contact.LINKEDIN_LINK')}
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon />
        </a>
      </div>
    </section>
  );
};

export default Introduction;
