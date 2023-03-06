import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import fetchImages from '../../Api';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    // totalHits: 0,
    totalPages: 0,
    isLoading: false,
    loadMore: false,
    showModal: false,
    targetImage: null,
  };

  searchImages() {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(searchQuery, page)
      .then(data => {
  
        if (!data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        } else {
          this.setState({ loadMore: true });
        }
        if (page === 1) {
          this.setState({
            // totalHits: data.totalHits,
            images: data.hits,
            totalPages: Math.ceil(data.totalHits / 12),
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => Notiflix.Notify.error('Something went wrong!'))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.searchImages();
      //   this.setState({
    //     // isLoading: true,
    //     page: 1,
    //     images: [],
    //   });
    //   this.searchImages();
    // }
    // if (prevState.page !== this.state.page) {
    //   this.searchImages();
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  formSubmitHandler = searchQuery => {
    this.setState(searchQuery);
  };

  toggleModal = ({ status, src, alt }) => {
    if (status) {
      this.setState({
        targetImage: { src, alt },
        showModal: true,
      });
    } else {
      this.setState({
        targetImage: null,
        showModal: false,
      });
    }
  };

  render() {
    const {
      images,
      targetImage,
      showModal,
      isLoading,
      loadMore,
      totalPages,
      page,
    } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {images.length > 0 && (
          <ImageGallery toggleModal={this.toggleModal}>
            <ImageGalleryItem images={images} />
          </ImageGallery>
        )}
        {showModal && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )}
        {isLoading && <Loader />}
        {loadMore && page < totalPages && (
          <Button onClick={this.loadMoreHandler} />
        )}
      </div>
    );
  }
}
