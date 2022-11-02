import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchString: '',
    media: 'photo',
    category: '',
  };

  setStateProperty = newProperty => {
   
    this.setState({ ...newProperty }, () => console.log('new===', this.state));
  };

  render() {
    return (
      <>
        <Searchbar setStateProperty={this.setStateProperty} />
        <ImageGallery searchSrting={this.state} />
        <ToastContainer autoClose={2000} position="top-center" />
      </>
    );
  }
}
