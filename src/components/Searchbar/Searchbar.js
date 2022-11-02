import { Component } from 'react';
import { TbMovie } from 'react-icons/tb';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiAbacus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import loupe from '../../img/loupe.svg';
import css from './Searchbar.module.css';

import PropTypes from 'prop-types';
const categoryOfMedia = [
  '',
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
];

export class Searchbar extends Component {
  state = {
    searchString: '',
    media: 'photo',
    category: '',
  };

  changeSearchString = e => this.setState({ searchString: e.target.value });
  setMedia = e => this.setState({ media: e.target.value });
  setCategory = e => this.setState({ category: e.target.value });

  beginNewSearch = e => {
    
    e.preventDefault();
    const { searchString, category } = this.state;
    if (searchString.trim() === '' && category === '') {
      toast.warn('Please choose category or/and enter search string');
      return;
    }
    
    this.props.setStateProperty(this.state);
  };
  render() {
    const { media, category } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.beginNewSearch}>
          <div>
            <label className={css.label}>
              <input
                type="radio"
                name="media"
                value="photo"
                checked={media === 'photo'}
                onChange={this.setMedia}
              />
              <HiOutlinePhotograph size="32" color="white" />
            </label>
            <label className={css.label}>
              <input
                type="radio"
                name="media"
                value="video"
                checked={media === 'video'}
                onChange={this.setMedia}
              />
              <TbMovie size="32" color="white" />
            </label>
          </div>

          <label className={css.label}>
            <BiAbacus size="32" color="white" />
            <select value={category} onChange={this.setCategory}>
              {categoryOfMedia.map(el => (
                <option key={el}>{el}</option>
              ))}
            </select>
          </label>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.changeSearchString}
          />

          <button type="submit" className={css.button}>
            <img className={css.img} src={loupe} alt="icon" />
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getSearchString: PropTypes.func,
};
