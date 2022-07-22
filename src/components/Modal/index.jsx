import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onModalClose();
    }
  };

  handleBackDropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.handleBackDropClick}>
        <div className={styles.modal}>
          <img
            className={styles.image}
            src={this.props.image}
            alt={this.props.tag}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Modal;
