import React from 'react';
import styles from './PageContentContainer.module.css';
import MobileHeader from '../../molecules/mobileHeader/MobileHeader';

interface PageContentContainerProps {
  wrapperClassName?: string;
  children: React.ReactNode;
  onMenuButtonClick: () => void;
}

const PageContentContainer: React.FC<PageContentContainerProps> = ({
  wrapperClassName = '',
  children,
  onMenuButtonClick,
}) => (
  <main className={styles.container}>
    <MobileHeader onMenuButtonClick={onMenuButtonClick} />
    <div className={`${styles.content} ${wrapperClassName}`}>{children}</div>
  </main>
);

export default PageContentContainer;
