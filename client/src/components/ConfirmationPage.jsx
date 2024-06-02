import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Text, Stack, VStack, Divider, Grid, GridItem, Spinner, Heading, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton 
} from '@chakra-ui/react';

const ConfirmationPage = ({ passengerDetails, flight, prevStep, nextStep }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentFireExitSeat, setCurrentFireExitSeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Fetch seats from the server
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/seats');
        const data = await response.json();
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);

  // Calculate total price based on selected seats
  useEffect(() => {
    let totalPrice = selectedSeats.reduce((acc, seatId) => {
      const seat = seats.find(seat => seat.id === seatId);
      return acc + (seat ? seat.price : 0);
    }, 0);

    // Apply discount if eligible
    if (discountApplied) {
      totalPrice *= 0.75; // Apply 25% discount
    }

    setTotalPrice(totalPrice);
  }, [selectedSeats, seats, discountApplied]);

  const handleSeatClick = (seat) => {
    // Handle seat selection
    if (seat.status && seat.seatClass.toLowerCase() === flight.class.toLowerCase()) {
      if (seat.isFireExit) {
        setCurrentFireExitSeat(seat);
        onOpen();
        return;
      }
      updateSelectedSeats(seat);
    }
  };

  const updateSelectedSeats = (seat) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seat.id)) {
        return prevSelected.filter((s) => s !== seat.id);
      } else {
        return [...prevSelected, seat.id];
      }
    });
  };

  const handleFireExitConfirmation = (acceptResponsibility) => {
    // Deselect the current fire exit seat regardless of responsibility acceptance
    updateSelectedSeats(currentFireExitSeat);
    setCurrentFireExitSeat(null);
    onClose();
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    nextStep({ selectedSeats, totalPrice });
  };

  const groupSeatsByClass = () => {
    return seats.reduce((acc, seat) => {
      acc[seat.seatClass] = acc[seat.seatClass] || [];
      acc[seat.seatClass].push(seat);
      return acc;
    }, {});
  };

  const groupedSeats = groupSeatsByClass();

  const getClassContainerBg = (seatClass) => {
    switch (seatClass) {
      case 'Business':
        return '#f1a733';
      case 'First':
        return 'gray.100';
      case 'Economy':
        return 'lightblue';
      default:
        return 'white';
    }
  };

  return (
    <Box bg="white" p={8} shadow="md" borderRadius="md">
      <Stack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">Flight Details</Text>
        <VStack align="start">
          <Text>Flight Number: {flight.flightNumber}</Text>
          <Text>Airline: {flight.airline}</Text>
          <Text>Price: ${flight.price}</Text>
          <Text>Class: {flight.class}</Text>
        </VStack>

        <Divider />

        <Text fontSize="lg" fontWeight="bold">Passenger List</Text>
        <VStack align="start">
          {passengerDetails.map((passenger, index) => (
            <Box key={index} p={2} bg="gray.100" borderRadius="md" width="100%">
              {`${passenger.name}, Age: ${passenger.age}`}
            </Box>
          ))}
        </VStack>

        <Divider />

        <Text fontSize="lg" fontWeight="bold">Select Seats</Text>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
            <Text ml={4}>Please wait...</Text>
          </Box>
        ) : (
          Object.entries(groupedSeats).map(([seatClass, seats]) => (
            <Box key={seatClass} mt={4} p={4} bg={getClassContainerBg(seatClass)} borderRadius="md">
              <Heading size="md" mb={2}>{seatClass} Class</Heading>
              <Grid templateColumns="repeat(10, 1fr)" gap={2}>
                {seats.map((seat) => (
                  <GridItem
                    key={seat.id}
                    w="40px"
                    h="40px"
                    bg={seat.status ? (selectedSeats.includes(seat.id) ? 'blue.500' : 'green.500') : 'gray.500'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    cursor={seat.status && seat.seatClass.toLowerCase() === flight.class.toLowerCase() ? 'pointer' : 'not-allowed'}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat.seatNumber}
                  </GridItem>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Stack>

      <Stack direction="row" mt={8} spacing={4} justify="end">
        <Button onClick={prevStep} fontWeight={500}>Back</Button>
        <Button colorScheme="teal" fontWeight={500} onClick={handleConfirmBooking}>Confirm Booking</Button>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fire Exit Seat Responsibility</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You have selected a fire exit seat. Do you accept responsibility for assisting in case of an emergency?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleFireExitConfirmation(false)}>
              No
            </Button>
            <Button colorScheme="green" onClick={() => handleFireExitConfirmation(true)}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ConfirmationPage;
