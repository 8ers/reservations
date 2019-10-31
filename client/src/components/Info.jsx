import React from 'react';
import PropTypes from 'prop-types';
import css from '../../dist/App.css';

const Info = (props) => {
  const { price, ratings, reviews } = props;

  return (
    <div className={css.roomInfo}>
      <div className={css.firstLine}>
        <div className={css.price}>
          $
          {price}
        </div>
        {' '}
        <span className={css.per}>  per night</span>
      </div>
      <div className={css.secondLine}>
         <span className={css.star}>&#9733;</span>
        <div className={css.ratings}>
          {ratings}
        </div>
        {' '}
        <div className={
          css.reviews}
        >
          {reviews}
        </div>
      </div>
      <div className={css.thirdLine} />
    </div>
  );
};

Info.propTypes = {
  price: PropTypes.number,
  ratings: PropTypes.number,
  reviews: PropTypes.number,
};

Info.defaultProps = {
  price: 0,
  ratings: 4.56,
  reviews: '(2,500 reviews)',
};


export default Info;
