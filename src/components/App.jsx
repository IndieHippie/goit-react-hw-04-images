import React from 'react';
import { PixabayAPI } from './API/API';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import styles from './Styles.module.css';
import Loader from './Loader/Loader';

const API = new PixabayAPI();

class App extends React.Component {
  state = {
    selectedItem: null,
    images: [],
    showModal: false,
    showLoader: false,
    isLoadingMore: false,
    isVisibleBtn: false,
  };

  // деструктуризація з дефолтним значенням
  loadPhotos = ({ withReplace = true } = {}) => {
    API.getPhotos()
      .then(photosResponse => {
        API.calculateTotalPages(photosResponse.total);
        this.setState({ isVisibleBtn: API.isShowLoadMore });

        const photos = photosResponse.hits.map(hit => {
          const filterdHit = {};
          filterdHit.id = hit.id;
          filterdHit.webformatURL = hit.webformatURL;
          filterdHit.largeImageURL = hit.largeImageURL;
          return filterdHit;
        });

        if (withReplace) {
          this.setState({ images: photos });
        } else {
          const filtersPhotos = photos.filter(photo => {
            return !this.state.images.find(img => img.id === photo.id);
          });
          this.setState(({ images }) => {
            return {
              images: [...images, ...filtersPhotos],
            };
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ showLoader: false, isLoadingMore: false });
      });
  };

  componentDidMount() {
    this.setState({ showLoader: true });
    this.loadPhotos();
  }

  // value What I Recive From Searchbar Input onSubmit
  onSubmit = value => {
    this.setState({ images: [], showLoader: true });
    API.resetPage();
    API.query = value;
    this.loadPhotos();
  };

  loadBtn = () => {
    this.setState({ isLoadingMore: true });
    API.incrementPage();
    this.loadPhotos({ withReplace: false });
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedItem: largeImageURL,
    }));
  };

  render() {
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
        />
        {this.state.showLoader && <Loader />}
        {this.state.isVisibleBtn && (
          <Button
            isLoadingMore={this.state.isLoadingMore}
            onClick={this.loadBtn}
          />
        )}
        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            largeImageURL={this.state.selectedItem}
          />
        )}
      </div>
    );
  }
}

export default App;
