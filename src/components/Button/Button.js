
import css from "./Button.module.css"

import PropTypes from 'prop-types';

export function Button({ increaseCurrentPage }) {
  return <button onClick={increaseCurrentPage} className={css.Button}>
    Load more</button>;
}



Button.propTypes = {
  searchSrting: PropTypes.func,
};