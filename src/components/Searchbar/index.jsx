import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = evt => {
    this.setState({ inputValue: evt.currentTarget.value });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.inputValue === '') {
      alert('Введите название');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.onFormSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}></button>

          <input
            onChange={this.handleInputChange}
            value={this.state.inputValue}
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
