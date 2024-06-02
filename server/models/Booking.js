import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  passengerDetails: [{ name: String, age: Number }],
  flight: {
    flightNumber: String,
    airline: String,
    price: Number,
    class: String
  },
  paymentDetails: {
    cardNumber: String,
    expiryDate: String,
    cvv: String
  },
  selectedSeats: [Object],
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

// Create the Booking model
const Booking = model('Booking', bookingSchema);

export default Booking;
