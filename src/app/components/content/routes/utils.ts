import blueTelefericoIcon from '../../../static/img/blue_teleferico.svg';
import brownTelefericoIcon from '../../../static/img/brown_teleferico.svg';
import greenTelefericoIcon from '../../../static/img/green_teleferico.svg';
import lightBlueTelefericoIcon from '../../../static/img/light_blue_teleferico.svg';
import orangeTelefericoIcon from '../../../static/img/orange_teleferico.svg';
import purpleTelefericoIcon from '../../../static/img/purple_teleferico.svg';
import redTelefericoIcon from '../../../static/img/red_teleferico.svg';
import silverTelefericoIcon from '../../../static/img/silver_teleferico.svg';
import whiteTelefericoIcon from '../../../static/img/white_teleferico.svg';
import yellowTelefericoIcon from '../../../static/img/yellow_teleferico.svg';

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
      // TODO: handle error case
      return '';
  }
};

export default getCorrespondingTelefericoIcon;
