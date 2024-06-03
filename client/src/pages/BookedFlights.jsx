import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Stack, Text, Flex, Spinner, useToast
} from '@chakra-ui/react';
import axios from 'axios';

const BookedFlights = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/bookings');
          console.log(response.data)
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: 'Error fetching bookings',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h2" mb={4}>Your Booked Flights</Heading>
      <Stack spacing={4}>
        {bookings.map((booking) => (
          <Box key={booking._id} p={4} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">Flight: {booking.flight}</Heading>
            <Text mt={2}>Passenger: {booking.passengerDetails.name}</Text>
            <Text mt={2}>Seats: {booking.selectedSeats.join(', ')}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BookedFlights;
