import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Button = ({ onLoadMoreClick }) => {
  return (
    <button
      onClick={() => onLoadMoreClick()}
      className={styles.button}
      type="button"
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};

export default Button;
