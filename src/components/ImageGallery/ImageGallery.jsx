import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
