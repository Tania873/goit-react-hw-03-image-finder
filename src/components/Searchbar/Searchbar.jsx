import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.failure('No images found!');
      return;
    }
    this.props.onSubmit(this.state);
    // this.resetForm();
  };

  // resetForm = () => {
  //   this.setState({ searchQuery: '' });
  // };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.searchQuery}
            className={css.input}
            name="searchQuery"
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

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
