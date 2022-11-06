import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

import PropTypes from 'prop-types';

export function ImageGalleryItem({ data: { small, large, tags } }) {

  const [showModal, setshowModal] = useState(false);

  const setShowModalbyClick = e => {
    if (e.currentTarget !== e.target) return;
    setshowModal(!showModal);
  };

  const setShowModalbyKey = () => setshowModal(!showModal);

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          onClick={setShowModalbyClick}
          src={small}
          alt={tags}
          className={css.ImageGalleryItem_image}
        />
      </li>

      {showModal && (
        <Modal onClick={setShowModalbyClick} onPress={setShowModalbyKey}>
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

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
