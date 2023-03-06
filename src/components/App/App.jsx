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
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.searchImages();
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  formSubmitHandler = ({ searchQuery }) => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
    });
  };

  toggleModal = (src, alt, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      targetImage: { src, alt },
      tags: tag,
    }));
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
          <ImageGallery>
            <ImageGalleryItem images={images} onImage={this.toggleModal} />
          </ImageGallery>
        )}
        {showModal && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            onClose={this.toggleModal}
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
