import express from 'express';
import cors from 'cors';
import BookingSystem from './BookingSystem.js';
import ConfirmBooking from './routes/ConfirmBooking.js'
import dotenv from 'dotenv';
import connectDB from './database/db.js';

const app = express();
const bookingSystem = new BookingSystem();

dotenv.config();
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your client
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/", ConfirmBooking);

app.get('/api/seats', (req, res) => {
    res.json(bookingSystem.seats);
  });

// app.post('/api/confirmBooking', async (req, res) => {
//     const { passengerDetails, flight, paymentDetails, userId } = req.body;
//     console.log(passengerDetails)
//     console.log(flight)
//     console.log(paymentDetails)
//     console.log(userId)

//   // Validate input data
//     if (!passengerDetails || !flight || !paymentDetails || !userId) {
//     return res.status(400).json({ success: false, message: 'Invalid request data' });
//   }

//   const seatClass = flight.class;
//   const seatCount = flight.travellers; // assuming passengerDetails is an array of passengers

//   // Book seats by class
//   const bookingSuccess = bookingSystem.bookSeatsByClass(seatClass, seatCount, userId);
//     if (!bookingSuccess) {
//       console.log("here")
//     return res.status(400).json({ success: false, message: 'Unable to book seats' });
//   }

//   // Simulate payment processing (this should be replaced with actual payment processing logic)
//   const paymentSuccessful = true; // Replace with actual payment logic
//   if (!paymentSuccessful) {
//     bookingSystem.cancelBooking(seatNumbers, userId);
//     return res.status(500).json({ success: false, message: 'Payment processing failed' });
//   }

//   res.json({ success: true, message: 'Booking confirmed', seatClass, seatCount });
// });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
// Periodic job to release expired seat locks
setInterval(() => {
  bookingSystem.releaseExpiredLocks();
}, 60000); // Check every minute
