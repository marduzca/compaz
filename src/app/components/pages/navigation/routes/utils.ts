import blueTelefericoIcon from '../../../../static/svg/teleferico_azul.svg';
import brownTelefericoIcon from '../../../../static/svg/teleferico_cafe.svg';
import greenTelefericoIcon from '../../../../static/svg/teleferico_verde.svg';
import lightBlueTelefericoIcon from '../../../../static/svg/teleferico_celeste.svg';
import orangeTelefericoIcon from '../../../../static/svg/teleferico_naranja.svg';
import purpleTelefericoIcon from '../../../../static/svg/teleferico_morado.svg';
import redTelefericoIcon from '../../../../static/svg/teleferico_rojo.svg';
import silverTelefericoIcon from '../../../../static/svg/teleferico_plateado.svg';
import whiteTelefericoIcon from '../../../../static/svg/teleferico_blanco.svg';
import yellowTelefericoIcon from '../../../../static/svg/teleferico_amarillo.svg';
import {
  EventType,
  NotificationType,
} from '../../../organisms/notification/Notification';
import { NotificationEvent } from '../../../domain';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../../organisms/notification/NotificationContainer';

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
        new CustomEvent(EventType.NOTIFICATION, {
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
