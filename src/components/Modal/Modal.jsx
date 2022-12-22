import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Styles.module.css';
import Loader from 'components/Loader/Loader';

export default function Modal({ closeModal, largeImageURL }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const backDropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={backDropClick}>
      <div className={styles.Modal}>
        <div className={styles.Loader}>
          <Loader />
        </div>
        <img className={styles.Modal_img} src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
