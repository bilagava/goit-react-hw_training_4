import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ImageGalleryItem = ({ smallImage, onOpen, tag }) => {
  return (
    <li onClick={onOpen} className={styles.galleryItem}>
      <img className={styles.galleryItemImage} src={smallImage} alt={tag} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
