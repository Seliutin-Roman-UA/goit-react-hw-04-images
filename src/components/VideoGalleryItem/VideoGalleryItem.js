import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './VideoGalleryItem.module.css';

import PropTypes from 'prop-types';

export class VideoGalleryItem extends Component {
  state = {
    showModal: false,
  };

 

  setShowModalbyClick = e => {
    if (e.currentTarget !== e.target) return;
    this.setState({ showModal: !this.state.showModal });
  };

  setShowModalbyKey = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { small, large } = this.props.data;

    return (
      <>
        <li className={css.ImageGalleryItem}>
          <video
            onClick={this.setShowModalbyClick}
            src={small}
            className={css.ImageGalleryItem_image}
          ></video>
        </li>

        {this.state.showModal && (
          <Modal
            onClick={this.setShowModalbyClick}
            onPress={this.setShowModalbyKey}
          >
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
VideoGalleryItem.propTypes = {
  data: PropTypes.shape({
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
