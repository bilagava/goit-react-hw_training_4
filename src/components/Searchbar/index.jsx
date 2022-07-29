import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = evt => {
    setInputValue(evt.currentTarget.value);
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    if (inputValue === '') {
      alert('Введите название');
      return;
    }

    onSubmit(inputValue);
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={onFormSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}></button>

        <input
          onChange={handleInputChange}
          value={inputValue}
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
