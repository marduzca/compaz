import React from 'react';
import styles from './PageContentContainer.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';

interface PageContentContainerProps {
  wrapperClassName?: string;
  children: React.ReactNode;
  onMenuButtonClick: () => void;
}

const PageContentContainer: React.FC<PageContentContainerProps> = (props) => (
  <main className={styles.container}>
    <MobileHeader onMenuButtonClick={props.onMenuButtonClick} />
    <div className={`${styles.content} ${props.wrapperClassName}`}>
      {props.children}
    </div>
  </main>
);

PageContentContainer.defaultProps = {
  wrapperClassName: '',
};

export default PageContentContainer;
