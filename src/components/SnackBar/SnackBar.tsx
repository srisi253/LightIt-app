import React, { useEffect } from 'react';
import './SnackBar.scss';

interface SnackbarProps {
  message: string;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, onClose }) => {

  const snackbarClass: string = message.toLowerCase().includes("success")?'snackbar-success' : message.toLowerCase().includes("error")?'snackbar-error' : 'snackbar'
    useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={snackbarClass}>
      {message}
    </div>
  );
};
