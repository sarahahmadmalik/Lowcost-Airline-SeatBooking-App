class Seat {
    constructor(id, seatNumber, seatClass, isFireExit = false) {
      this.id = id;
      this.seatNumber = seatNumber;
      this.seatClass = seatClass;
      this.status = 'available'; // 'available', 'locked', 'booked'
      this.isFireExit = isFireExit;
      this.lockExpiry = null;
      this.bookedBy = null;
    }
  
    lockSeat(userId) {
      if (this.status === 'available') {
        this.status = 'locked';
        this.lockExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        this.bookedBy = userId;
        return true;
      }
      return false;
    }
  
    releaseSeat() {
      if (this.status === 'locked' && Date.now() > this.lockExpiry) {
        this.status = 'available';
        this.lockExpiry = null;
        this.bookedBy = null;
      }
    }
  
    bookSeat(userId) {
      if (this.status === 'locked' && this.bookedBy === userId) {
        this.status = 'booked';
        this.lockExpiry = null;
        return true;
      }
      return false;
    }
  
    cancelBooking() {
      if (this.status === 'booked') {
        this.status = 'available';
        this.bookedBy = null;
      }
    }
  }
  
  class BookingSystem {
    constructor() {
      this.seats = this.initializeSeats();
    }
  
    initializeSeats() {
      const seats = [];
      let idCounter = 1;
      const seatLayout = [
        { rows: [1, 2, 3], class: 'First', cols: ['A', 'B', 'C', 'D'] },
        { rows: [4, 5, 6, 7], class: 'Business', cols: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { rows: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], class: 'Economy', cols: ['A', 'B', 'C', 'D', 'E', 'F'] }
      ];
  
      for (let section of seatLayout) {
        for (let row of section.rows) {
          for (let col of section.cols) {
            const seatNumber = `${row}${col}`;
            const isFireExit = (row === 10 || row === 16) && (col >= 'A' && col <= 'F');
            seats.push(new Seat(idCounter++, seatNumber, section.class, isFireExit));
          }
        }
      }
  
      return seats;
    }
  
    findSeat(seatNumber) {
      return this.seats.find(seat => seat.seatNumber === seatNumber);
    }
  
    findAvailableSeats(seatClass, count) {
      const availableSeats = this.seats.filter(seat => seat.seatClass.toLowerCase() === seatClass.toLowerCase() && seat.status.toLowerCase() === 'available');
      return availableSeats.slice(0, count).map(seat => seat.seatNumber);
    }
  
    lockSeats(seatNumbers, userId) {
      for (let seatNumber of seatNumbers) {
        const seat = this.findSeat(seatNumber);
        if (!seat || !seat.lockSeat(userId)) {
          return false; // Lock failed for at least one seat
        }
      }
      return true;
    }
  
    releaseExpiredLocks() {
      this.seats.forEach(seat => seat.releaseSeat());
    }
  
    bookSeats(seatNumbers, userId) {
      for (let seatNumber of seatNumbers) {
        const seat = this.findSeat(seatNumber);
        if (!seat || !seat.bookSeat(userId)) {
          return false; // Booking failed for at least one seat
        }
      }
      return true;
    }
  
    cancelBooking(seatNumbers, userId) {
      for (let seatNumber of seatNumbers) {
        const seat = this.findSeat(seatNumber);
        if (seat && seat.bookedBy === userId) {
          seat.cancelBooking();
        }
      }
    }
  
    bookSeatsByClass(seatClass, count, userId) {
      const seatNumbers = this.findAvailableSeats(seatClass, count);
      if (seatNumbers.length < count) {
        return false; // Not enough seats available
      }
      const lockSuccess = this.lockSeats(seatNumbers, userId);
      if (!lockSuccess) {
        return false;
      }
      return this.bookSeats(seatNumbers, userId);
    }
  }
  
  export default BookingSystem;
  