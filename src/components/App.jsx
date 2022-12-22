import React, { useState, useEffect } from 'react';
import { PixabayAPI } from './API/API';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import styles from './Styles.module.css';
import Loader from './Loader/Loader';

const API = new PixabayAPI();

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);

  // деструктуризація з дефолтним значенням


  useEffect(() => {
    setShowLoader(true);
    loadPhotos();
  }, []);

    const loadPhotos = ({ withReplace = true } = {}) => {
    API.getPhotos()
      .then(photosResponse => {
        API.calculateTotalPages(photosResponse.total);
        setIsVisibleBtn(API.isShowLoadMore);

        const photos = photosResponse.hits.map(hit => {
          const filterdHit = {};
          filterdHit.id = hit.id;
          filterdHit.webformatURL = hit.webformatURL;
          filterdHit.largeImageURL = hit.largeImageURL;
          return filterdHit;
        });

        if (withReplace) {
          setImages(photos);
        } else {
          const filtersPhotos = photos.filter(photo => {
            return !images.find(img => img.id === photo.id);
          });
          setImages(prevImages => {
            return [...prevImages, ...filtersPhotos];
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setShowLoader(false);
        setIsLoadingMore(false);
      });
  };

  // value What I Recive From Searchbar Input onSubmit
  const onSubmit = value => {
    setImages([]);
    setShowLoader(true);
    API.resetPage();
    API.query = value;
    loadPhotos();
  };

  const loadBtn = () => {
    setIsLoadingMore(true);
    API.incrementPage();
    loadPhotos({ withReplace: false });
  };

  const toggleModal = largeImageURL => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedItem(largeImageURL);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} toggleModal={toggleModal} />
      {showLoader && <Loader />}
      {isVisibleBtn && (
        <Button isLoadingMore={isLoadingMore} onClick={loadBtn} />
      )}
      {showModal && (
        <Modal closeModal={toggleModal} largeImageURL={selectedItem} />
      )}
    </div>
  );
}

export default App;
