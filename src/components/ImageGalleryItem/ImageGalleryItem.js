import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  setShowModal = e => {
    if (e.currentTarget !== e.target) return;
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { small, tags, large } = this.props.data;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            onClick={this.setShowModal}
            src={small}
            alt={tags}
            className={css.ImageGalleryItem_image}
          />
        </li>

        {this.state.showModal && (
          <Modal callback={this.setShowModal}>
            <img
              src={large}
              alt={tags}
              style={{
                display: 'blocks',
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: 'auto',
              }}
            />
          </Modal>
        )}
      </>
    );
  }
}


ImageGalleryItem.propTypes = {
  small: PropTypes.string.isRequired,
  tags: PropTypes.string,
  large: PropTypes.string.isRequired,
};