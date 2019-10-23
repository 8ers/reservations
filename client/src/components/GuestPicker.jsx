import React from 'react';
import PropTypes from 'prop-types';
import css from '../../dist/App.css';

const GuestPicker = (props) => {
  const {
    maxGuests,
    adults,
    numChildren,
    infants,
    increaseGuest,
    decreaseGuest,
    guestExpandToggle,
  } = props;

  return (
    <div className={css.picker}>
      <div>
        <div className={css.guestType}>
          Adults
          <div className={css.buttonSection}>
            <button type="submit" className={css.adults} id="adults" disabled={adults === 1} onClick={decreaseGuest}>- </button>
            <div className={css.countAdults}>{adults}</div>
            <button type="submit" className={css.adults} id="adults" disabled={adults + numChildren === maxGuests} onClick={increaseGuest}> + </button>
          </div>
        </div>
        <div />
        <br />
        <br />
        <div className={css.guestType}>
          Children
          <div className={css.buttonSection}>
            <button type="submit" className={css.children} id="children" disabled={numChildren === 0} onClick={decreaseGuest}>-</button>
            <div className={css.count}>{numChildren}</div>
            <button type="submit" className={css.children} id="children" disabled={numChildren + adults === maxGuests} onClick={increaseGuest}>+</button>
          </div>
        </div>
        <div className={css.guestTypeInfo}>Ages 2-12</div>
        <br />
        <div className={css.guestType}>
          Infants
          <div className={css.buttonSection}>
            <button type="submit" className={css.infants} id="infants" disabled={infants === 0} onClick={decreaseGuest}>-</button>
            <div className={css.count}>{infants}</div>
            <button type="submit" className={css.infants} id="infants" disabled={adults === 0} onClick={increaseGuest}>+</button>
          </div>
        </div>
        <div className={css.guestTypeInfo}>Under 2</div>
      </div>
      <br />
      <div>
        {`${maxGuests} guests maximum. Infants don't count toward the number of guests.`}
      </div>
      <button type="submit" className={css.close} onClick={guestExpandToggle}>Close</button>
    </div>
  );
};

GuestPicker.propTypes = {
  maxGuests: PropTypes.number,
  adults: PropTypes.number,
  numChildren: PropTypes.number,
  infants: PropTypes.number,
  increaseGuest: PropTypes.func,
  decreaseGuest: PropTypes.func,
  guestExpandToggle: PropTypes.func,
};

GuestPicker.defaultProps = {
  maxGuests: 4,
  adults: 0,
  numChildren: 0,
  infants: 0,
  increaseGuest: () => { },
  decreaseGuest: () => { },
  guestExpandToggle: () => { },
};


export default GuestPicker;
