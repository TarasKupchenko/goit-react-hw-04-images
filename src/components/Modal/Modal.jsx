import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleCloseClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleCloseClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

//Modal.propTypes = {
//  onClose: PropTypes.func.isRequired,
//  largeImageURL: PropTypes.string.isRequired,
//};

export default Modal;
