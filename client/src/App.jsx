import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Info from './components/Info.jsx';
import Form from './components/Form.jsx';
import css from '../dist/App.css';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stayId: 1,
      price: 0,
      cleaningFee: 0,
      serviceFee: 0,
      tax: 0,
      maxGuests: 0,
      ratings: 4.85,
      numReviews: 234,
      visits: 0,
      reservations: [],
      rendering: true,
      dateSelected: false
    };
    this.getBookingData = this.getBookingData.bind(this);
    this.getData = this.getData.bind(this);
    this.updateRoomState = this.updateRoomState.bind(this);
    this.updateBookedDates = this.updateBookedDates.bind(this);
    this.handleRendering = this.handleRendering.bind(this);
    this.changeDateClicked = this.changeDateClicked.bind(this);
  }

  componentDidMount() {
    const stayId = Number(window.location.pathname.split('/')[2]) || 5;
    this.setState({
      stayId,
    }, this.getData);
  }

  changeDateClicked(val) {
    if(val === 1) {
      this.setState({
        dateSelected:false
      },console.log('change'));
    } else {
      this.setState({
        dateSelected:true
      },console.log('change'));
    }
  }

  getData() {
    axios.get(`/api/rooms/${this.state.stayId}`)
      .then((result) => {
        console.log(result.data.rows[0]);
        this.updateBookedDates(result.data.rows[0].reservations);
        this.updateRoomState(result.data.rows[0]);
      })
      .catch(err => console.log(err));
  }

  getBookingData() {
    axios.get(`/api/rooms/${this.state.stayId}/reservations`)
      .then((result) => {
        this.updateBookedDates(result.data);
      })
      .catch(err => console.log(err));
  }

  handleRendering() {
    this.setState({
      rendering: false,
    });
  }

  updateBookedDates(results) {
    let reservations = [];
    results.forEach((data) => {
      let nights = moment(data.end).diff(data.start, 'd');
      let startDate = moment(data.start, 'YYYY-MM-DD');
      for (let i = 0; i < nights; i += 1) {
        reservations.push(startDate.clone().add(i, 'days'));
        console.log(reservations[reservations.length-1].toDate());
      }
    });
    this.setState({
      reservations: reservations,
    },console.log(reservations));
  }

  updateRoomState(result) {
    this.setState({
      stayId: parseInt(result.stay_id),
      price: result.price,
      maxGuests: result.guests,
      visits: result.visits
    },console.log(this.state.reservations));
  }


  render() {
    const divStyle = {
      height: '16px', width: '16px', display: 'block', fill: 'rgb(118, 118, 118)',
    };
    let lower;
    if(this.state.dateSelected) {
      lower =         <div className={css.image} style={{backgroundImage: 'url("https://airbnbicons.s3-us-west-1.amazonaws.com/diamond1.gif")'}}>
      <div className={css.lower}>This is a rare find.</div>
      <div className={css.lowerPrice}>This place is usually booked.</div>
    </div>;
    } else {
      lower =         <div className={css.image} style={{backgroundImage: 'url("https://airbnbicons.s3-us-west-1.amazonaws.com/bulb1.gif")'}}>
      <div className={css.lower}>This place is getting a lot of attention.</div>
      <div className={css.lowerPrice}>It's been viewed 500+ times in the past week.</div>
    </div>;
    }
    const app = (
      <div className={css.app} style={{ backgroundColor: '#030304' }} >
        <div>
          <Info
            price={this.state.price}
            reviews={this.state.numreviews}
            ratings={this.state.ratings}
          />
        </div>
        <div className={css.dividingSection} />
        <div>
          <Form
            maxGuests={this.state.maxGuests}
            price={this.state.price}
            cleaningFee={this.state.cleaningfee}
            serviceFee={this.state.servicefee}
            tax={this.state.tax}
            bookedDates={this.state.reservations}
            stayId={this.state.stayId}
            ratings={this.state.ratings}
            getBookingData={this.getBookingData}
            changeDateClicked={this.changeDateClicked}
          />
        </div>

        <div className={css.notYet}>You won’t be charged yet</div>
        <div className={css.dividingSection} />
        {lower}
      </div>
    );

    return (
      <div style={{ float: 'right', display: 'sticky' }}>
        {this.state.rendering ? app : null}
      </div>
    );
  }
}
