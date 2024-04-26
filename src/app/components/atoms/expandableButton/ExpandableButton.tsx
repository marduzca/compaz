import React, { useState } from 'react';
import styles from './ExpandableButton.module.css';

interface ExpandableButtonProps {
  accessibleName: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  isRounded?: boolean;
}

const ExpandableButton: React.FC<ExpandableButtonProps> = ({
  className = '',
  isRounded = false,
  accessibleName,
  icon,
  onClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <button
      aria-label={accessibleName}
      title={accessibleName}
      type="button"
      className={`${styles.expandableButton} ${className} ${
        isRounded && styles.roundedButton
      }`}
      onClick={() => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        onClick();
      }}
      aria-expanded={isMobileMenuOpen}
      aria-haspopup
    >
      {icon}
    </button>
  );
};

export default ExpandableButton;
