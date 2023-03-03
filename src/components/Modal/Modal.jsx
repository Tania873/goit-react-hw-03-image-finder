import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkEvent);
  }

  checkEvent = ({ key, target, currentTarget }) => {
    if (key === 'Escape' || target === currentTarget) {
      this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.checkEvent}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
