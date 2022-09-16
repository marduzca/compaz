import React from 'react';
import styles from './PageContentContainer.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';

interface PageContentContainerProps {
  children: React.ReactNode;
  onMenuButtonClick: () => void;
}

const PageContentContainer: React.FC<PageContentContainerProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader
      onMenuButtonClick={props.onMenuButtonClick}
      hasLightBackground
    />
    <div className={styles.content}>{props.children}</div>
  </main>
);
export default PageContentContainer;
