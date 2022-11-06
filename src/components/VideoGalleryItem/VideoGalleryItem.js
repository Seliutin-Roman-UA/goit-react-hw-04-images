import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './VideoGalleryItem.module.css';

import PropTypes from 'prop-types';

export function VideoGalleryItem({ data: { small, large, tags } }) {
  const [showModal, setshowModal] = useState(false);

  const setShowModalbyClick = e => {
    if (e.currentTarget !== e.target) return;
    setshowModal(!showModal);
  };

  const setShowModalbyKey = () => setshowModal(!showModal);

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <video
          onClick={setShowModalbyClick}
          src={small}
          className={css.ImageGalleryItem_image}
        ></video>
      </li>

      {showModal && (
        <Modal onClick={setShowModalbyClick} onPress={setShowModalbyKey}>
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

VideoGalleryItem.propTypes = {
  data: PropTypes.shape({
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
