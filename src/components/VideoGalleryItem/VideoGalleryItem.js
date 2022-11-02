import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './VideoGalleryItem.module.css';

import PropTypes from 'prop-types';

export class VideoGalleryItem extends Component {
  state = {
    showModal: false,
  };
  setShowModal = e => {
    e.preventDefault();
    if (e.currentTarget !== e.target) return;
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { small, tags, large } = this.props.data;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <video
            onClick={this.setShowModal}
            src={small}
            className={css.ImageGalleryItem_image}
          ></video>
        </li>

        {this.state.showModal && (
          <Modal callback={this.setShowModal}>
            <video
              src={large}
              autoPlay
              controls
              style={{ width: '100%', height: 'auto' }}
            ></video>
          </Modal>
        )}
      </>
    );
  }
}
