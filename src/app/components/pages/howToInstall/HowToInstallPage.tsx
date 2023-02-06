import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { ReactComponent as BulletPoint } from '../../../static/svg/bullet.svg';
import devices from '../../../static/img/devices.png';
import styles from './HowToInstallPage.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';
import InstructionsContainer from './instructions/InstructionsContainer';
import { PAGE_TITLE_PREFIX } from '../../../App';

interface HowToInstallProps {
  onMenuButtonClick: () => void;
}

const HowToInstallPage: React.FC<HowToInstallProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${PAGE_TITLE_PREFIX} ${t(
      'HowToInstall.HOW_TO_INSTALL_TITLE'
    )}`;
    // eslint-disable-next-line
  }, [i18n.language]);

  return (
    <main className={styles.container}>
      <MobileHeader onMenuButtonClick={props.onMenuButtonClick} />
      <div className={styles.content}>
        <h1>{t('Menu.HOW_TO_INSTALL')}</h1>
        <section
          className={styles.benefits}
          aria-label={t('HowToInstall.BENEFITS')}
        >
          <ul>
            <li>
              <BulletPoint aria-hidden />
              <span>{t('HowToInstall.ANY_DEVICE_BENEFIT')}</span>
            </li>
            <li>
              <BulletPoint aria-hidden />
              <span>{t('HowToInstall.NATIVE_APP_BENEFIT')}</span>
            </li>
            <li>
              <BulletPoint aria-hidden />
              <span>{t('HowToInstall.OFFLINE_BENEFIT')}</span>
            </li>
          </ul>
          <img
            src={devices}
            alt={t('HowToInstall.DEVICES_IMAGE_ALT')}
            loading="lazy"
          />
        </section>
        <InstructionsContainer />
      </div>
    </main>
  );
};

export default HowToInstallPage;
