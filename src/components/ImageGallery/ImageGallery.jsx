import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ toggleModal, children }) => {
  const checkEvent = event => {
    if (event.target !== event.currentTarget) {
      toggleModal({
        status: true,
        src: event.target.dataset.imageurl,
        alt: event.target.alt,
      });
    }
  };
  return (
    <ul className={css.gallery} onClick={checkEvent}>
      {children}
    </ul>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
