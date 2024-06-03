import { Router } from 'express';
import Booking from '../models/Booking.js'; 
import BookingSystem from '../BookingSystem.js';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

const bookingSystem = new BookingSystem(); 

// POST route to confirm booking
router.post('/confirmBooking', async (req, res) => {
  try {
    // Extract data from the request body
    const { passengerDetails, flight, paymentDetails, selectedSeats, userId } = req.body;

    // Find the seat objects corresponding to the selected seat IDs
      const seats = bookingSystem.seats.filter(seat => selectedSeats.includes(seat.id));


      if (seats.length !== selectedSeats.length) {
        // console.log("hereee")
      return res.status(400).json({ success: false, message: 'Some selected seats are not available.' });
    }

    // // Lock the selected seats using the BookingSystem
    // const lockSuccess = bookingSystem.lockSeats(seats, userId);
    //   if (!lockSuccess) {
  
    //   return res.status(400).json({ success: false, message: 'Failed to lock selected seats.' });
    // }

    // Book the selected seats using the BookingSystem
    const bookSuccess = bookingSystem.bookSeats(selectedSeats, userId);
      if (!bookSuccess) {
      console.log("j")
      // If booking fails, release the locks
      bookingSystem.releaseExpiredLocks();
      return res.status(400).json({ success: false, message: 'Failed to book selected seats.' });
    }

    // Save booking data to the database
    const newBooking = new Booking({
      passengerDetails,
      flight,
      paymentDetails,
      selectedSeats: seats,
      userId
    });
    await newBooking.save();

    res.status(200).json({ success: true, message: 'Booking confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming booking:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while confirming the booking.' });
  }
});

// GET route to fetch all bookings
router.get('/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find(); // Fetch all bookings from the database
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      res.status(500).json({ success: false, message: 'An error occurred while fetching bookings.' });
    }
  });

export default router;
