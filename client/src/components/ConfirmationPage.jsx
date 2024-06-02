import React, { useState, useEffect } from 'react';
import { 
  Box, Button, Text, Stack, VStack, Divider, Grid, GridItem, Spinner, Heading, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton
} from '@chakra-ui/react';

const ConfirmationPage = ({ passengerDetails, flight, prevStep, nextStep, selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState([]);
  const [currentFireExitSeat, setCurrentFireExitSeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedPassengerIds, setDiscountedPassengerIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(flight.price);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  // console.log(seats)

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
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };
  
    console.log("Fetching seats...");
    fetchSeats();
  }, []); // Ensure that the dependencies array is correct
  
  console.log(selectedSeats)

  // Calculate total price based on selected seats
  useEffect(() => {
    let totalPrice = selectedSeats.reduce((acc, seatId) => {
      const seat = seats.find(seat => seat.id === seatId);
      return acc + (seat ? flight.price : 0);
    }, flight.price);

    // Apply discount if eligible
    if (discountApplied) {
      totalPrice *= 0.75; // Apply 25% discount
    }

    setTotalPrice(totalPrice);
  }, [selectedSeats, seats, discountApplied]);

  const handleSeatClick = (seat) => {
    // Handle seat selection
    if (seat.status && seat.seatClass.toLowerCase() === flight.class.toLowerCase()) {
      if (selectedSeats.length < 6 || selectedSeats.includes(seat.id)) {
        if (seat.isFireExit) {
          setCurrentFireExitSeat(seat);
          onOpen();
          return;
        }
        updateSelectedSeats(seat);
      } else {
        setIsAlertOpen(true);
      }
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
    if (acceptResponsibility) {
      // If the user accepts responsibility, update selected seats
      updateSelectedSeats(currentFireExitSeat);
    } else {
      // If the user declines responsibility, deselect the current fire exit seat
      setSelectedSeats((prevSelected) => prevSelected.filter((s) => s !== currentFireExitSeat.id));
    }
    setCurrentFireExitSeat(null);
    onClose();
  };
  

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    nextStep({ selectedSeats, discountApplied, discountedPassengerIds, totalPrice });
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
      <Stack spacing={4} >
        <Text fontSize="lg" fontWeight="bold">Flight Details</Text>
        <Text fontSize="lg" fontWeight="bold">Flight Details</Text>
<VStack align="start">
  <Text>Flight Number: {flight.flightNumber}</Text>
  <Text>Airline: {flight.airline}</Text>
  <Text>Price per Seat: ${flight.price}</Text>
  <Text>Class: {flight.class}</Text>
  {/* Display discount information */}
  {discountApplied && (
    <Text color="green.500">Discount Applied: 25%</Text>
  )}
  {/* Display selected seats as badges */}
  <Text fontSize="lg" fontWeight="bold">Selected Seats</Text>
  <Stack direction="row" flexWrap="wrap">
    {selectedSeats.map((seatId) => {
      const seat = seats.find(seat => seat.id === seatId);
      return (
        <Box key={seatId} bg="blue.500" color="white" p={2} borderRadius="md" m={1}>
          {seat.seatNumber}
        </Box>
      );
    })}
  </Stack>
  <Text fontSize="lg" fontWeight="bold">
    Total Price: <span style={{ color: 'blue' }}>${totalPrice.toFixed(2)}</span>
    {discountApplied && (
      <span style={{ color: 'green', marginLeft: '10px' }}>(Discount Applied: 25%)</span>
    )}
  </Text>
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
                    cursor={seat.status                    && seat.seatClass.toLowerCase() === flight.class.toLowerCase() ? 'pointer' : 'not-allowed'}
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
            <Button colorScheme="red" mr={3} onClick={()=> handleFireExitConfirmation(false)}>
              No
            </Button>
            <Button colorScheme="green" onClick={() => handleFireExitConfirmation(true)}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={undefined}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Booking Constraint
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              You can only book a maximum of 6 seats in a single transaction. Would you like to proceed with booking the first 6 seats?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="teal" ml={3} onClick={() => {
                setIsAlertOpen(false);
                nextStep({ selectedSeats: selectedSeats.slice(0, 6), discountApplied, discountedPassengerIds, totalPrice });
              }}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ConfirmationPage;
