import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './IconsRoute.module.css';
import getCorrespondingTelefericoIcon from './utils';
import transferIcon from '../../../static/img/double_arrow.svg';
import { Route } from '../../domain';

interface SimpleIconsRouteProps {
  route: Route;
  hideTimes?: boolean;
}

const IconsRoute: React.FC<SimpleIconsRouteProps> = (props) => {
  const { t } = useTranslation();

  const renderRoute = (): ReactNode[] => {
    const lineIcons = props.route.subRoutes.map((subRoute) => (
      <li key={subRoute.line} className={styles.teleferico}>
        <img
          key={`${subRoute.line}`}
          title={t(`Content.Route.Lines.${subRoute.line.toUpperCase()}`)}
          alt={t(`Content.Route.Lines.${subRoute.line.toUpperCase()}`)}
          src={getCorrespondingTelefericoIcon(subRoute.line)}
        />
        {!props.hideTimes && <span>{subRoute.totalTime}</span>}
      </li>
    ));

    for (
      let index = 0;
      index < props.route.subRoutes.length * 2 - 1;
      index += 1
    ) {
      if (index !== 0 && index % 2 === 1) {
        lineIcons.splice(
          index,
          0,
          <li key={`transfer-${index}`} className={styles.transfer}>
            <img
              src={transferIcon}
              title={t('Content.RoutesOverview.TRANSFER')}
              alt={t('Content.RoutesOverview.TRANSFER')}
            />
            {!props.hideTimes && (
              <span>
                {
                  props.route.subRoutes[Math.floor(index / 2)]
                    .transferTimeToNextLine
                }
              </span>
            )}
          </li>
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

IconsRoute.defaultProps = {
  hideTimes: false,
};

export default IconsRoute;
