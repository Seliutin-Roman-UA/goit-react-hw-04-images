import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';


export function App () {
  
    return (
      <>
        <Searchbar  />
        <ImageGallery  />
        <ToastContainer autoClose={2000} position="top-center" />
      </>
    );
  
}
