import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class Button extends Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
        className={styles.button}
        type="button"
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
