import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Styles.module.css';
import Loader from 'components/Loader/Loader';

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  backDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return(
      <div className={styles.Overlay} onClick={this.backDropClick}>
        <div className={styles.Modal}>
          <div className={styles.Loader}>
          <Loader />
          </div>
          <img
            className={styles.Modal_img}
            src={this.props.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
