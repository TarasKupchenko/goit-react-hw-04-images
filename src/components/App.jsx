import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
import { fetchImagesApi } from './Api/Api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImagesApi(searchQuery, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowBtn(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeURL => {
    setLargeImageURL(largeURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && showBtn && (
        <Button onClick={handleLoadMoreClick} />
      )}
      {showModal && (
        <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
