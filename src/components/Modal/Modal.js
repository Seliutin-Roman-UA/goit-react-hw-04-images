import { Component } from 'react';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onPressKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onPressKey);
  }
  onPressKey = e => {
    if (e.code === 'Escape') this.props.onPress();
  };

  render() {
    const { children, onClick } = this.props;
    return (
      <div className={css.backdrope} onClick={onClick}>
        <div className={css.modal}>{children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element,
  callback: PropTypes.func,
};
