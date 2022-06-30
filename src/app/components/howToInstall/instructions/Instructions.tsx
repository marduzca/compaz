import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Instructions.module.css';
import installLaptopChromeSource from '../../../static/gif/install_laptop_chrome.gif';
import installAndroidChromeSource from '../../../static/gif/install_android_chrome.gif';
import installAndroidFirefoxSource from '../../../static/gif/install_android_firefox.png';
import installAndroidSamsungSource from '../../../static/gif/install_android_samsung.gif';
import installIphoneSafariSource from '../../../static/gif/install_iphone_safari.gif';
import { Browser, Device } from './InstructionsContainer';
import Select, { Option } from '../../atoms/select/Select';

interface InstructionsProps {
  selectedDevice: Device;
  onDeviceSelection: (newDevice: string) => void;
  selectedBrowser: Browser;
  onBrowserSelection: (newBrowser: string) => void;
  availableBrowsers: Browser[];
}

const DEVICE_SELECTOR_LABEL_ID = 'deviceSelectorId';
const BROWSER_SELECTOR_LABEL_ID = 'browserSelectorId';

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
          <div className={styles.selectorWithLabel}>
            <label id={DEVICE_SELECTOR_LABEL_ID}>
              {t('HowToInstall.Instructions.DEVICE_SELECTOR_LABEL')}
            </label>
            <Select
              labelId={DEVICE_SELECTOR_LABEL_ID}
              onChange={(option: Option) =>
                props.onDeviceSelection(option.value)
              }
              selectedOption={
                {
                  value: props.selectedDevice,
                  text: t(
                    `HowToInstall.Instructions.${props.selectedDevice}_OPTION`
                  ),
                } as Option
              }
              options={Object.keys(Device).map(
                (device) =>
                  ({
                    value: device,
                    text: t(`HowToInstall.Instructions.${device}_OPTION`),
                  } as Option)
              )}
            />
          </div>
          <div className={styles.selectorWithLabel}>
            <label id={BROWSER_SELECTOR_LABEL_ID}>
              {t('HowToInstall.Instructions.BROWSER_SELECTOR_LABEL')}
            </label>
            <Select
              labelId={BROWSER_SELECTOR_LABEL_ID}
              onChange={(option: Option) =>
                props.onBrowserSelection(option.value)
              }
              selectedOption={
                {
                  value: props.selectedBrowser,
                  text: props.selectedBrowser,
                } as Option
              }
              options={props.availableBrowsers.map(
                (browser) =>
                  ({
                    value: browser,
                    text: browser,
                  } as Option)
              )}
            />
          </div>
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
            <li>
              {t(
                `HowToInstall.Instructions.STEP_1_${
                  props.selectedDevice
                }_${props.selectedBrowser
                  .toLocaleUpperCase()
                  .replace(/ /g, '_')}`
              )}
            </li>
            <li>
              {t(
                `HowToInstall.Instructions.STEP_2_${
                  props.selectedDevice
                }_${props.selectedBrowser
                  .toLocaleUpperCase()
                  .replace(/ /g, '_')}`
              )}
            </li>
            <li>{t('HowToInstall.Instructions.STEP_3')}</li>
            <li>{t('HowToInstall.Instructions.STEP_4')}</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
