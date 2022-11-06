import { useEffect, useState } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { fetchData } from 'service/fetchdata';
import { Button } from 'components/Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import { VideoGalleryItem } from 'components/VideoGalleryItem/VideoGalleryItem';
import { useSearchContext } from 'hooks/useSearchContext';

const imgPerPage = 12;

export function ImageGallery() {
  const [arrayImg, setArrayImg] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const { data } = useSearchContext();
  const { searchString, media, category} = data;

  useEffect(() => {
    setPage(1);
    setArrayImg([])
    setMaxPage(1)
  }, [searchString, media, category]);

  useEffect(() => {
    if (searchString==="" && category==="") return;
      setloading(true);
    fetchData(searchString, media, category, page, imgPerPage)
      .then(fetchData => {
        if (fetchData.arrayImg.length === 0) {
          toast.warn('Sorry we could not find any media on your request');
          return;
        }
        const maxPage =
          fetchData.totalHits === 0
            ? 1
            : Math.ceil(fetchData.totalHits / imgPerPage);
        setMaxPage(maxPage);
        setArrayImg(state => {
          if (page === 1) return [...fetchData.arrayImg];
          return [...state, ...fetchData.arrayImg];
        });
      })
      .catch(error => console.log('Shit happen ', error))
      .finally(() => setloading(false));
  }, [searchString, media, category, page]);

  const increaseCurrentPage = () => {
    if (page >= maxPage) return;
    setPage((state) => state + 1 );
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {media === 'photo' &&
          arrayImg.map(el => <ImageGalleryItem key={el.id} data={el} />)}
        {media === 'video' &&
          arrayImg.map(el => <VideoGalleryItem key={el.id} data={el} />)}
      </ul>
      {maxPage !== page && <Button increaseCurrentPage={increaseCurrentPage} />}
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
