import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Styles.module.css';

class ImageGalleryItem extends React.Component {
  handleClickItem = () => {
    this.props.onSelectItem(this.props.id);
  };

  render() {
    return (
      <li
        id={this.props.id}
        className={styles.ImageGalleryItem}
        onClick={() => {
          this.props.toggleModal(this.props.largeImageURL)
        }}>
        <img
          className={styles.ImageGalleryItem_image}
          src={this.props.webformatURL} alt="" />
      </li>
    );
  }
}

ImageGalleryItem.protoType = {
  toggleModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
