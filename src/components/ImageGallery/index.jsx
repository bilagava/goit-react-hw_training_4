import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './styles.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          onOpen={() => openModal(largeImageURL, tags)}
          tag={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
