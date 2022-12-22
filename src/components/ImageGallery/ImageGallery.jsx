import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from 'components/Styles.module.css';

export default function ImageGallery({toggleModal, images}) {
    return (
      <ul className={styles.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            toggleModal={toggleModal}
          />
        ))}
      </ul>
    );
  }


ImageGallery.propTypes = {
  toggleModal: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
};
