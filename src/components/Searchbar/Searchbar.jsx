import React from 'react';
import styles from 'components/Styles.module.css';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';

class Searchbar extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ inputValue: value });
  };

  reset = () => {
    this.setState({ inputValue: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.reset();
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
            value={this.state.inputValue}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
