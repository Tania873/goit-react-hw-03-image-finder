import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ThreeDots
        visible={true}
        height="100"
        width="100"
        radius="9"
        color="#69709c"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
      />
    </div>
  );
};

export default Loader;
