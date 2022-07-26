import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './styles.module.css';

function Modal({ image, onModalClose, tag }) {
  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  return (
    <div className={styles.overlay} onClick={handleBackDropClick}>
      <div className={styles.modal}>
        <img className={image} src={image} alt={tag} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  tag: PropTypes.string,
};

export default Modal;
