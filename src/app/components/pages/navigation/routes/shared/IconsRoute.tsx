import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './IconsRoute.module.css';
import getCorrespondingTelefericoIcon from '../utils';
import transferIcon from '../../../../../static/svg/double_arrow.svg';
import { SubRoute } from '../../../../domain';

interface SimpleIconsRouteProps {
  subRoutes: SubRoute[];
  hideTimes?: boolean;
}

const IconsRoute: React.FC<SimpleIconsRouteProps> = ({
  hideTimes = false,
  subRoutes,
}) => {
  const { t } = useTranslation();

  const renderRoute = (): ReactNode[] => {
    const lineIcons = subRoutes.map((subRoute) => (
      <li key={subRoute.line} className={styles.teleferico}>
        <img
          key={subRoute.line}
          title={t(`Navigation.Route.Lines.${subRoute.line.toUpperCase()}`)}
          alt={t(`Navigation.Route.Lines.${subRoute.line.toUpperCase()}`)}
          src={getCorrespondingTelefericoIcon(subRoute.line)}
          loading="lazy"
        />
        {!hideTimes && <span>{subRoute.totalTime}</span>}
      </li>
    ));

    for (let index = 0; index < subRoutes.length * 2 - 1; index += 1) {
      if (index !== 0 && index % 2 === 1) {
        lineIcons.splice(
          index,
          0,
          <li key={`transfer-${index}`} className={styles.transfer}>
            {!hideTimes && (
              <span>
                {subRoutes[Math.floor(index / 2)].transferTimeToNextLine}
              </span>
            )}
            <img
              src={transferIcon}
              alt={t('Navigation.RoutesOverview.TRANSFER')}
              loading="lazy"
            />
          </li>,
        );
      }
    }

    return lineIcons;
  };

  return (
    <ol className={styles.route}>
      {renderRoute().map((routeItem) => routeItem)}
    </ol>
  );
};

export default IconsRoute;
