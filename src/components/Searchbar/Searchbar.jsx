import React, { useState } from 'react';
import styles from 'components/Styles.module.css';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const reset = () => {
    setInputValue('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    reset();
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div>
              <FiSearch />
            </div>
          </IconContext.Provider>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>
        <input
          className={styles.SearchForm_input}
          onChange={handleChange}
          value={inputValue}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
