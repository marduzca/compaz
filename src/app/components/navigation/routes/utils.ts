import blueTelefericoIcon from '../../../static/svg/blue_teleferico.svg';
import brownTelefericoIcon from '../../../static/svg/brown_teleferico.svg';
import greenTelefericoIcon from '../../../static/svg/green_teleferico.svg';
import lightBlueTelefericoIcon from '../../../static/svg/light_blue_teleferico.svg';
import orangeTelefericoIcon from '../../../static/svg/orange_teleferico.svg';
import purpleTelefericoIcon from '../../../static/svg/purple_teleferico.svg';
import redTelefericoIcon from '../../../static/svg/red_teleferico.svg';
import silverTelefericoIcon from '../../../static/svg/silver_teleferico.svg';
import whiteTelefericoIcon from '../../../static/svg/white_teleferico.svg';
import yellowTelefericoIcon from '../../../static/svg/yellow_teleferico.svg';
import { NotificationType } from '../../notification/Notification';
import { NotificationEvent } from '../../domain';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../notification/NotificationContainer';

const getCorrespondingTelefericoIcon = (lineColor: string): string => {
  switch (lineColor) {
    case 'blue':
      return blueTelefericoIcon;
    case 'brown':
      return brownTelefericoIcon;
    case 'green':
      return greenTelefericoIcon;
    case 'light_blue':
      return lightBlueTelefericoIcon;
    case 'orange':
      return orangeTelefericoIcon;
    case 'purple':
      return purpleTelefericoIcon;
    case 'red':
      return redTelefericoIcon;
    case 'silver':
      return silverTelefericoIcon;
    case 'white':
      return whiteTelefericoIcon;
    case 'yellow':
      return yellowTelefericoIcon;
    default:
      window.dispatchEvent(
        new CustomEvent('notification', {
          detail: {
            type: NotificationType.ERROR,
            content: GENERAL_ERROR_NOTIFICATION_KEY,
          } as NotificationEvent,
        })
      );

      return '';
  }
};

export default getCorrespondingTelefericoIcon;
