import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images }) =>
  images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li key={id} className={css.galleryItem}>
      <img
        className={css.image}
        src={webformatURL}
        alt={tags}
        data-imageurl={largeImageURL}
        // onClick={}
      />
    </li>
  ));
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
