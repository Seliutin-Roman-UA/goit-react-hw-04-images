import { useReducer } from 'react';
import { TbMovie } from 'react-icons/tb';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiAbacus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import loupe from '../../img/loupe.svg';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useSearchContext } from 'hooks/useSearchContext';

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

export function Searchbar() {
  const initstate = {
    searchString: '',
    media: 'photo',
    category: '',
  };

  function reducer(state, action) {
    const changingState = { ...state };
    const { type, payload } = action;
    if (state[type] === undefined) return state;
    changingState[type] = payload;
    return changingState;
  }

  const [searchData, dispatch] = useReducer(reducer, initstate);
  const { setData } = useSearchContext();

  const changeSearchData = e =>
    dispatch({ type: e.target.name, payload: e.target.value });
  const beginNewSearch = e => {
    e.preventDefault();
    const { searchString, category } = searchData;
    if (searchString.trim() === '' && category === '') {
      toast.warn('Please choose category or/and enter search string');
      return;
    }

    setData(searchData);
  };

  const { media, category } = searchData;

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={beginNewSearch}>
        <div>
          <label className={css.label}>
            <input
              type="radio"
              name="media"
              value="photo"
              checked={media === 'photo'}
              onChange={changeSearchData}
            />
            <HiOutlinePhotograph size="32" color="white" />
          </label>
          <label className={css.label}>
            <input
              type="radio"
              name="media"
              value="video"
              checked={media === 'video'}
              onChange={changeSearchData}
            />
            <TbMovie size="32" color="white" />
          </label>
        </div>

        <label className={css.label}>
          <BiAbacus size="32" color="white" />
          <select name="category" value={category} onChange={changeSearchData}>
            {categoryOfMedia.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </label>
        <input
          className={css.input}
          name="searchString"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeSearchData}
        />

        <button type="submit" className={css.button}>
          <img className={css.img} src={loupe} alt="icon" />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  getSearchString: PropTypes.func,
};
