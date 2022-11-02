import { Component } from 'react';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    const { children, callback } = this.props;
    return (
      <div className={css.backdrope} onClick={callback}>
        <div className={css.modal}>{children}</div>
      </div>
    );
  }
}


Modal.propTypes = {
  children: PropTypes.element,
  callback: PropTypes.func,
};