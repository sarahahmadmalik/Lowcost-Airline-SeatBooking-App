import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, VStack, Divider, Text } from '@chakra-ui/react';

const PassengerInfoForm = ({ passengerDetails, setPassengerDetails, nextStep, flight }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    age: '',
    birthday: '',
    idCardNumber: '',
    limit: ''
  });

  const handleAddPassenger = () => {
    const errors = {};
    
    // Check if the number of passengers added is equal to the flight's passenger count
    if (passengerDetails.length >= flight.travellers) {
      errors.limit = `You can only add ${flight.travellers} passengers for this flight.`;
      setFormErrors(errors);
      return;
    }
  
    // Perform form validation
    if (!name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      errors.age = 'Please enter a valid age.';
    }
    if (!birthday.trim()) {
      errors.birthday = 'Please enter your birthday.';
    }
    if (!idCardNumber.trim()) {
      errors.idCardNumber = 'Please enter your ID card number.';
    }
  
    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      setPassengerDetails([...passengerDetails, { name, age, birthday, idCardNumber }]);
      setName('');
      setAge('');
      setBirthday('');
      setIdCardNumber('');
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };
  
  const Next = () => {
    const errors = {};
  
    if (passengerDetails.length < flight.travellers) {
      // Perform form validation
      if (!name.trim()) {
        errors.name = 'Please enter your name.';
      }
      if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
        errors.age = 'Please enter a valid age.';
      }
      if (!birthday.trim()) {
        errors.birthday = 'Please enter your birthday.';
      }
      if (!idCardNumber.trim()) {
        errors.idCardNumber = 'Please enter your ID card number.';
      }
  
      // Check if there are any errors
      if (Object.keys(errors).length === 0) {
        nextStep();
        setFormErrors({});
      } else {
        setFormErrors(errors);
      }
    } else {
      nextStep();
    }
  };
  

  return (
    <Box bg="white" p={8} shadow="md" borderRadius="md">
      <Stack spacing={4}>
        <FormControl isInvalid={!!formErrors.name}>
          <FormLabel>Passenger Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <Text color="red.500">{formErrors.name}</Text>
        </FormControl>
        <FormControl isInvalid={!!formErrors.age}>
          <FormLabel>Passenger Age</FormLabel>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" />
          <Text color="red.500">{formErrors.age}</Text>
        </FormControl>
        <FormControl isInvalid={!!formErrors.birthday}>
          <FormLabel>Birthday</FormLabel>
          <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Enter your birthday" />
          <Text color="red.500">{formErrors.birthday}</Text>
        </FormControl>
        <FormControl isInvalid={!!formErrors.idCardNumber}>
          <FormLabel>ID Card Number</FormLabel>
          <Input value={idCardNumber} onChange={(e) => setIdCardNumber(e.target.value)} placeholder="Enter your ID card number" />
          <Text color="red.500">{formErrors.idCardNumber}</Text>
        </FormControl>
        <FormControl isInvalid={!!formErrors.limit}>
          <Text color="red.500">{formErrors.limit}</Text>
        </FormControl>
        <Button colorScheme="blue" fontWeight={500} onClick={handleAddPassenger} disabled={passengerDetails.length >= flight.travellers}>Add Passenger</Button>
      </Stack>

      {passengerDetails.length > 0 && (
        <Box mt={8}>
          <Heading as="h2" fontSize="xl" mb={4}>Passenger List</Heading>
          <Stack spacing={2}>
            {passengerDetails.map((passenger, index) => (
              <Box key={index} p={4} bg="gray.100" borderRadius="md">
                {`${passenger.name}, Age: ${passenger.age}, Birthday: ${passenger.birthday}, ID Card Number: ${passenger.idCardNumber}`}
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button mt={8} colorScheme="teal" fontWeight={500} onClick={Next} disabled={passengerDetails.length === 0 || Object.keys(formErrors).length > 0}>Next</Button>
      </Box>
    </Box>
  );
};

export default PassengerInfoForm;
