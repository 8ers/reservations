import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import Date from './Date.jsx';
import Cost from './Cost.jsx';
import Guest from './Guest.jsx';
import css from '../../dist/App.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 1,
      children: 0,
      infants: 0,
      adultMessage: '1 guest',
      childrenMessage: '',
      infantMessage: '',
      guestSelected: false,
      guestExpand: false,
      totalCostPerNight: 0,
      totalCost: 0,
      calculatedTax: 0,
      selectedNights: '',
      checkIn: '',
      checkOut: '',
      selectedDate: 0,
      checkInClicked: false,
      checkOutClicked: false,
    };

    this.increaseGuest = this.increaseGuest.bind(this);
    this.decreaseGuest = this.decreaseGuest.bind(this);
    this.guestButtonMessage = this.guestButtonMessage.bind(this);
    this.guestSelectToggle = this.guestSelectToggle.bind(this);
    this.guestExpandToggle = this.guestExpandToggle.bind(this);
    this.calculateCostPerNight = this.calculateCostPerNight.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.handleCheckinClicked = this.handleCheckinClicked.bind(this);
    this.handleCheckoutClicked = this.handleCheckoutClicked.bind(this);
    this.calendarInitialize = this.calendarInitialize.bind(this);
    this.updateTotalNights = this.updateTotalNights.bind(this);
    this.clickOutsideGuest = this.clickOutsideGuest.bind(this);
    this.handleBothUnclicked = this.handleBothUnclicked.bind(this);
    this.makeBooking = this.makeBooking.bind(this);
    this.bookButtonClick = this.bookButtonClick.bind(this);
    this.formInitialize = this.formInitialize.bind(this);
  }

  onDayClick(e, dateContext, cb1, cb2) {
    const {
      checkInClicked, checkOutClicked, checkIn, checkOut,
    } = this.state;
    if (checkInClicked) {
      if (checkOut !== '') {
        this.setState({
          checkIn: dateContext.format('MM/DD/YYYY'),
          checkOut: '',
        }, cb1());
      } else {
        this.setState({
          checkIn: dateContext.format('MM/DD/YYYY'),
          checkOut: '',
        }, cb1());
      }
    } else if (checkOutClicked) {
      if (checkOut !== '' && moment(checkIn, 'MM/DD/YYYY') > dateContext) {
        this.setState({
          checkIn: dateContext.format('MM/DD/YYYY'),
          checkOut: '',
        }, cb2(), this.guestExpandToggle(e), this.handleBothUnclicked(), cb1());
      } else if (checkIn !== dateContext.format('MM/DD/YYYY')) {
        this.setState({
          checkOut: dateContext.format('MM/DD/YYYY'),
        }, cb2(), this.guestExpandToggle(e), this.handleBothUnclicked());
      }
    }
  }

  guestButtonMessage() {
    const { adults, children, infants } = this.state;
    let { adultMessage, childrenMessage, infantMessage } = this.state;
    adultMessage = adults === 1 ? '1 guest' : `${adults} guests`;
    childrenMessage = children === 1 ? '1 child' : `${children} children`;
    infantMessage = infants === 1 ? '1 infant' : `${infants} infants`;
    this.setState({
      adultMessage,
      childrenMessage,
      infantMessage,
    });
  }

  guestSelectToggle(e) {
    this.setState({
      guestSelected: true,
    }, this.calculateCostPerNight);
    e.preventDefault();
  }

  guestExpandToggle(e) {
    this.setState({
      guestExpand: !this.state.guestExpand,
      guestSelected: true,
    }, this.calculateCostPerNight);
    this.updateTotalNights();
    e.preventDefault();
  }

  clickOutsideGuest() {
    this.setState({
      guestExpand: false,
    });
  }

  calculateCostPerNight() {
    const {
      price, serviceFee, cleaningFee, tax,
    } = this.props;
    const { selectedNights } = this.state;
    let cost = price + serviceFee + cleaningFee;
    let totalTax = cost * (tax / 100);
    totalTax = parseFloat(tax.toFixed(2));
    cost += totalTax;
    cost = parseFloat(cost.toFixed(2));
    const totalCost = cost * selectedNights;
    this.setState({
      totalCostPerNight: cost,
      calculatedTax: totalTax,
      totalCost,
    });
  }

  increaseGuest(e) {
    console.log('hi');
    e.preventDefault(e);
    this.setState({
      [e.target.id]: this.state[e.target.id] + 1,
    }, this.guestButtonMessage);
  }

  decreaseGuest(e) {
    e.preventDefault(e);
    this.setState({
      [e.target.id]: this.state[e.target.id] - 1,
    }, this.guestButtonMessage);
  }

  handleCheckinClicked() {
    this.setState({
      checkInClicked: true,
      checkOutClicked: false,
    });
  }

  handleCheckoutClicked() {
    this.setState({
      checkOutClicked: true,
      checkInClicked: false,
    });
  }

  handleBothUnclicked() {
    this.setState({
      checkInClicked: false,
      checkOutClicked: false,
    });
  }

  updateTotalNights() {
    const { checkOut, checkIn } = this.state;
    let nights = moment(checkOut, 'MM/DD/YY') - moment(checkIn, 'MM/DD/YY');
    nights = moment(nights).format('D');
    this.setState({
      selectedNights: nights,
    });
  }

  calendarInitialize(e) {
    this.setState({
      checkIn: '',
      checkOut: '',
    }, this.handleCheckinClicked());
    e.preventDefault();
  }

  makeBooking(roomId) {
    const {
      checkIn, checkOut, adults, children, infants,
    } = this.state;
    const { getBookingData } = this.props;
    const checkInDate = moment(checkIn, 'MM/DD/YYYY').format('YYYY-MM-DD');
    const checkOutDate = moment(checkOut, 'MM/DD/YYYY').format('YYYY-MM-DD');
    const data = JSON.stringify({
      roomId,
      adults,
      children,
      infants,
      checkin: checkInDate,
      checkout: checkOutDate,
    });
    alert('Made booking' + data);
  }

  bookButtonClick() {
    const { checkOut, checkIn, guestSelected } = this.state;
    if (checkIn === '' || checkOut === '') {
      this.handleCheckinClicked();
    } else if (!guestSelected) {
      this.guestExpandToggle();
    } else {
      this.makeBooking(this.state.roomId);
    }
  }

  formInitialize() {
    this.setState({
      adults: 1,
      children: 0,
      infants: 0,
      adultMessage: '1 guest',
      childrenMessage: '',
      infantMessage: '',
      guestSelected: false,
      guestExpand: false,
      totalCostPerNight: 0,
      totalCost: 0,
      calculatedTax: 0,
      selectedNights: '',
      checkIn: '',
      checkOut: '',
      selectedDate: 0,
      checkInClicked: false,
      checkOutClicked: false,
    });
  }

  render() {
    const {
      adults,
      children,
      infants,
      adultMessage,
      childrenMessage,
      infantMessage,
      checkIn,
      checkOut,
      checkInClicked,
      checkOutClicked,
      guestSelected,
      guestExpand,
      selectedNights,
      calculatedTax,
      totalCost,
    } = this.state;

    const {
      bookedDates,
      maxGuests,
      maxChildren,
      maxInfants,
      price,
      cleaningFee,
      serviceFee,
      minNights,
      roomId,
      roomname,
      reviews,
      ratings,
    } = this.props;

    let message = adultMessage;

    if (children !== 0) {
      message += `, ${childrenMessage}`;
    }
    if (infants) {
      message += `, ${infantMessage}`;
    }

    return (
      <section>
        <form className={css.form}>
          <div>
            <Date
              checkIn={checkIn}
              checkOut={checkOut}
              onDayClick={this.onDayClick}
              bookedDates={bookedDates}
              handleCheckinClicked={this.handleCheckinClicked}
              handleCheckoutClicked={this.handleCheckoutClicked}
              checkInClicked={checkInClicked}
              checkOutClicked={checkOutClicked}
              calendarInitialize={this.calendarInitialize}
              minNight={minNights}
              handleBothUnclicked={this.handleBothUnclicked}
            />
            <Guest
              maxGuests={maxGuests}
              maxChildren={maxChildren}
              maxInfants={maxInfants}
              adults={adults}
              numChildren={children}
              infants={infants}
              increaseGuest={this.increaseGuest}
              decreaseGuest={this.decreaseGuest}
              guestSelectToggle={this.guestSelectToggle}
              message={message}
              guestButtonMessage={this.guestButtonMessage}
              guestSelected={guestSelected}
              guestExpandToggle={this.guestExpandToggle}
              guestExpand={guestExpand}
              updateTotalNights={this.updateTotalNights}
              clickOutsideGuest={this.clickOutsideGuest}
            />
            {selectedNights !== 'Invalid date' && guestSelected && !guestExpand
              ? (
                <Cost
                  price={price}
                  cleaningFee={cleaningFee}
                  serviceFee={serviceFee}
                  tax={calculatedTax}
                  totalCost={totalCost}
                  selectedNights={selectedNights}
                />
              ) : null}
          </div>
        </form>
        <div className={css.bookbutton}>
          <button className={css.book} type="button" onClick={this.bookButtonClick}><div>Reserve</div></button>
        </div>
      </section>

    );
  }
}

Form.propTypes = {
  maxGuests: PropTypes.number,
  maxChildren: PropTypes.number,
  maxInfants: PropTypes.number,
  price: PropTypes.number,
  cleaningFee: PropTypes.number,
  serviceFee: PropTypes.number,
  tax: PropTypes.number,
  bookedDates: PropTypes.arrayOf(PropTypes.object),
  minNights: PropTypes.number,
  roomId: PropTypes.number,
  roomname: PropTypes.string,
  reviews: PropTypes.number,
  ratings: PropTypes.number,
  getBookingData: PropTypes.func,
};

Form.defaultProps = {
  maxGuests: 0,
  maxChildren: 0,
  maxInfants: 0,
  price: 0,
  cleaningFee: 0,
  serviceFee: 0,
  tax: 0,
  bookedDates: [{}],
  minNights: 0,
  roomId: '1',
  roomname: '',
  reviews: 0,
  ratings: 0,
  getBookingData: () => { },
};
