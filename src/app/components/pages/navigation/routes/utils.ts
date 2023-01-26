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
import { LineColor, NotificationEvent } from '../../../domain';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../../organisms/notification/NotificationContainer';

const getCorrespondingTelefericoIcon = (lineColor: string): string => {
  switch (lineColor) {
    case LineColor.BLUE:
      return blueTelefericoIcon;
    case LineColor.BROWN:
      return brownTelefericoIcon;
    case LineColor.GREEN:
      return greenTelefericoIcon;
    case LineColor.LIGHT_BLUE:
      return lightBlueTelefericoIcon;
    case LineColor.ORANGE:
      return orangeTelefericoIcon;
    case LineColor.PURPLE:
      return purpleTelefericoIcon;
    case LineColor.RED:
      return redTelefericoIcon;
    case LineColor.SILVER:
      return silverTelefericoIcon;
    case LineColor.WHITE:
      return whiteTelefericoIcon;
    case LineColor.YELLOW:
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
