import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.button}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onBtnClick: PropTypes.func,
};
