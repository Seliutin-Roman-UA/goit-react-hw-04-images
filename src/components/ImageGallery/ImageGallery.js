import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { fetchData } from 'service/fetchdata';
import { Button } from 'components/Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import { VideoGalleryItem } from 'components/VideoGalleryItem/VideoGalleryItem';
import PropTypes from 'prop-types';

const imgPerPage = 12;

export class ImageGallery extends Component {
  state = {
    arrayImg: [],
    maxPage: 1,
    currentPage: 1,
    loading: false,
    searchString: '',
    media: 'photo',
    category: '',
  };

  increaseCurrentPage = () => {
    if (this.state.currentPage >= this.state.maxPage) return;
    this.setState(state => ({ currentPage: state.currentPage + 1 }));
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { searchString, media, category } = nextProps.searchSrting;
    const {
      searchString: searchString_,
      media: media_,
      category: category_,
    } = prevState;

    if (
      searchString_ !== searchString ||
      media_ !== media ||
      category_ !== category
    ) {
      console.log('++++++NUL++++++');
      return {
        arrayImg: [],
        maxPage: 1,
        currentPage: 1,
        loading: false,
        searchString: searchString,
        media: media,
        category: category,
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      searchString: searchString_,
      media: media_,
      category: category_,
    } = prevProps.searchSrting;
    const { searchString, media, category } = this.props.searchSrting;
    const { currentPage: currentPage_ } = prevState;
    const { currentPage } = this.state;

    if (
      searchString_ === searchString &&
      media_ === media &&
      category_ === category &&
      currentPage_ === currentPage
    )
      return;

    this.setState({ loading: true });

    fetchData(this.props.searchSrting, imgPerPage, this.state.currentPage)
      .then(data => {
        console.log(data);
        if (data.arrayImg.length === 0) {
          toast.warn('Sorry we could not find any media on your request');
          return;
        }
        const maxPage =
          data.totalHits === 0 ? 1 : Math.ceil(data.totalHits / imgPerPage);
        this.setState(state => ({
          maxPage,
          arrayImg: [...state.arrayImg, ...data.arrayImg],
        }));
      })
      .catch(error => console.log('Shit happen ', error))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { arrayImg, maxPage, currentPage, loading, media } = this.state;

    return (
      <>
        <ul className={css.ImageGallery}>
          {media === 'photo' &&
            arrayImg.map(el => <ImageGalleryItem key={el.id} data={el} />)}
          {media === 'video' &&
            arrayImg.map(el => <VideoGalleryItem key={el.id} data={el} />)}
        </ul>
        {maxPage !== currentPage && (
          <Button increaseCurrentPage={this.increaseCurrentPage} />
        )}
        {loading && (
          <Modal>
            <RotatingLines
              strokeColor="rgb(57, 57, 163)"
              strokeWidth="8"
              animationDuration="2"
              width="144"
              visible={true}
            />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchSrting: PropTypes.shape({
    searchSrting: PropTypes.string,
    media: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};
