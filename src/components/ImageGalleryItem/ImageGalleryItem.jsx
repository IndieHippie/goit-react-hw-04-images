import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Styles.module.css';

function ImageGalleryItem({toggleModal, id, webformatURL, largeImageURL}) {
  
    return (
      <li
        id={id}
        className={styles.ImageGalleryItem}
        onClick={() => {
          toggleModal(largeImageURL)
        }}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL} alt="" />
      </li>
    );
  }


ImageGalleryItem.protoType = {
  toggleModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
