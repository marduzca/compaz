import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Instructions.module.css';
import installLaptopChromeSource from '../../../static/gif/install_laptop_chrome.gif';
import installAndroidChromeSource from '../../../static/gif/install_android_chrome.gif';
import installAndroidFirefoxSource from '../../../static/gif/install_android_firefox.png';
import installAndroidSamsungSource from '../../../static/gif/install_android_samsung.gif';
import installIphoneSafariSource from '../../../static/gif/install_iphone_safari.gif';
import { Browser, Device } from './InstructionsContainer';

interface InstructionsProps {
  selectedDevice: Device;
  onDeviceSelection: (newDevice: string) => void;
  selectedBrowser: Browser;
  onBrowserSelection: (newBrowser: string) => void;
  availableBrowsers: Browser[];
}

const Instructions: React.FC<InstructionsProps> = (props) => {
  const { t } = useTranslation();

  const installationGifSource = useMemo(() => {
    switch (props.selectedDevice) {
      case Device.ANDROID_AND_TABLET:
        switch (props.selectedBrowser) {
          case Browser.MOZILLA_FIREFOX:
            return installAndroidFirefoxSource;
          case Browser.SAMSUNG_INTERNET:
            return installAndroidSamsungSource;
          default:
            return installAndroidChromeSource;
        }

      case Device.IPHONE_AND_IPAD:
        return installIphoneSafariSource;

      default:
        return installLaptopChromeSource;
    }
  }, [props.selectedDevice, props.selectedBrowser]);

  return (
    <section className={styles.container} aria-labelledby="instructions">
      <h2 id="instructions">{t('HowToInstall.Instructions.HEADING')}</h2>
      <div className={styles.content}>
        <header className={styles.selectors}>
          <label>
            <span>{t('HowToInstall.Instructions.DEVICE_SELECTOR_LABEL')}</span>
            <select
              value={props.selectedDevice}
              onChange={(event) => props.onDeviceSelection(event.target.value)}
            >
              {Object.keys(Device).map((device) => (
                <option value={device} key={device}>
                  {t(`HowToInstall.Instructions.${device}_OPTION`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{t('HowToInstall.Instructions.BROWSER_SELECTOR_LABEL')}</span>
            <select
              value={props.selectedBrowser}
              onChange={(event) => props.onBrowserSelection(event.target.value)}
            >
              {props.availableBrowsers.map((browser) => (
                <option value={browser} key={browser}>
                  {browser}
                </option>
              ))}
            </select>
          </label>
        </header>
        <div className={styles.steps}>
          {!localStorage.getItem('replaceGifForVisualRegressionTest') ? (
            <img
              src={installationGifSource}
              alt={t('HowToInstall.Instructions.INSTALLATION_GIF_ALT', {
                device: t(
                  `HowToInstall.Instructions.${props.selectedDevice}_OPTION`
                ),
                browser: props.selectedBrowser,
              })}
              className={styles.installationGif}
              loading="lazy"
            />
          ) : (
            <div
              role="img"
              aria-label="FAKE GIF"
              className={`${styles.installationGif} ${styles.fakeGif} ${
                props.selectedDevice !== Device.LAPTOP && styles.fakeGifMobile
              }`}
            >
              FAKE GIF
            </div>
          )}
          <ol>
            <li>{t('HowToInstall.Instructions.STEP_1_LAPTOP')}</li>
            <li>{t('HowToInstall.Instructions.STEP_2_LAPTOP')}</li>
            <li>{t('HowToInstall.Instructions.STEP_3')}</li>
            <li>{t('HowToInstall.Instructions.STEP_4')}</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
