import React from 'react';
import MapImage from '../../static/img/fake_map.png';
import styles from './PageContent.module.css';
import TripSelectorContainer from './tripSelector/TripSelectorContainer';

interface PageContentProps {
  onMenuButtonClick: () => void;
}

const PageContent: React.FC<PageContentProps> = (props) => (
  <div className={styles.content}>
    <TripSelectorContainer onMenuButtonClick={props.onMenuButtonClick} />
    <img className={styles.map} alt="Map" src={MapImage} />
  </div>
);

export default PageContent;
