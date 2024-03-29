import React, { useState } from 'react';
import styles from './ExpandableButton.module.css';

interface ExpandableButtonProps {
  accessibleName: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  isRounded?: boolean;
}

const ExpandableButton: React.FC<ExpandableButtonProps> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <button
      aria-label={props.accessibleName}
      title={props.accessibleName}
      type="button"
      className={`${styles.expandableButton} ${props.className} ${
        props.isRounded && styles.roundedButton
      }`}
      onClick={() => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        props.onClick();
      }}
      aria-expanded={isMobileMenuOpen}
      aria-haspopup
    >
      {props.icon}
    </button>
  );
};

ExpandableButton.defaultProps = {
  className: '',
  isRounded: false,
};

export default ExpandableButton;
