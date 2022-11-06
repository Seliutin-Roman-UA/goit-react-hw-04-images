import { useEffect } from 'react';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

export function Modal({ children, onPress, onClick }) {
 
  useEffect(() => {
    const onPressKey = e => {
      if (e.code === 'Escape') onPress();
    };
    window.addEventListener('keydown', onPressKey);

    return () => window.removeEventListener('keydown', onPressKey);
  }, [onPress]);

  return (
    <div className={css.backdrope} onClick={onClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  callback: PropTypes.func,
};


