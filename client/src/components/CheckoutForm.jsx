import React, { useState, useRef } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Flex, Spinner,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';

const CheckoutForm = ({ passengerDetails, flight, prevStep }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [formErrors, setFormErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleExpiryDateChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, '');
    const formattedInput = numericInput.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    setExpiryDate(formattedInput);
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    const errors = {};
    if (!cardNumber.trim()) {
      errors.cardNumber = 'Please enter your card number.';
    }
    if (!expiryDate.trim()) {
      errors.expiryDate = 'Please enter the expiry date.';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = 'Invalid expiry date format. Please use MM/YY format.';
    }
    if (!cvv.trim()) {
      errors.cvv = 'Please enter the CVV.';
    } else if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = 'CVV must be a 3-digit number.';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/api/confirmBooking', {
          passengerDetails,
          flight,
          paymentDetails: {
            cardNumber,
            expiryDate,
            cvv
          },
          userId: 'user123'
        });

        setTimeout(() => {
          setLoading(false);
          if (response.data.success) {
            setMessage('Yayy! Your Flight is booked');
            setIsError(false);
          } else {
            setMessage('Booking failed: ' + response.data.message);
            setIsError(true);
          }
          onOpen(); // Open the AlertDialog
        }, 1000);
      } catch (error) {
        setLoading(false);
        setIsError(true);
        setMessage('Booking failed: An error occurred.');
        onOpen(); // Open the AlertDialog
      }
    } else {
      setLoading(false);
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Box bg="white" p={8} shadow="md" borderRadius="md">
        <Heading as="h2" fontSize="xl" mb={4}>Checkout</Heading>
        <Stack spacing={4}>
          <FormControl isInvalid={!!formErrors.cardNumber}>
            <FormLabel>Card Number</FormLabel>
            <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Enter your card number" />
            <Text color="red.500">{formErrors.cardNumber}</Text>
          </FormControl>
          <Flex justifyContent="space-between" alignItems="center">
            <FormControl isInvalid={!!formErrors.expiryDate} flex="1" mr={4}>
              <FormLabel>Expiry Date (MM/YY)</FormLabel>
              <Input value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" />
              <Text color="red.500">{formErrors.expiryDate}</Text>
            </FormControl>
            <FormControl isInvalid={!!formErrors.cvv} flex="1">
              <FormLabel>CVV</FormLabel>
              <Input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="Enter CVV" />
              <Text color="red.500">{formErrors.cvv}</Text>
            </FormControl>
          </Flex>
        </Stack>

        <Box display="flex" justifyContent="flex-end">
          <Button mt={8} mr={4} fontWeight={500} onClick={prevStep}>Back</Button>
          <Button mt={8} colorScheme="teal" fontWeight={500} onClick={handleConfirmBooking}>
            {loading ? <Spinner size="sm" /> : 'Confirm Booking'}
          </Button>
        </Box>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>{isError ? 'Booking Failed' : 'Booking Confirmed'}</AlertDialogHeader>
            <AlertDialogBody>
              <Text>{message}</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CheckoutForm;
