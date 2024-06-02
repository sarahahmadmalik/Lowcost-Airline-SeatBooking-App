import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Stack, Badge, HStack, Button, Flex } from '@chakra-ui/react';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const handleBookFlight = () => {
    // Navigate to the user detail form page and pass the flight object
    navigate('/user-detail-form', { state: { flight: flight } });
  };

  const getClassBgColor = (flightClass) => {
    switch (flightClass) {
      case 'business':
        return '#f1a733';
      case 'economy':
        return 'silver';
      case 'first':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Box p={2} borderWidth="1px" borderRadius="md" shadow="md" width="100%" maxW="60%">
      {/* Top Row */}
      <HStack justifyContent="space-between" alignItems="center" p={2} bg="gray.100" borderRadius="md">
        <Text fontSize="md" fontWeight="bold">{flight.flightNumber} - {flight.airline} Airlines</Text>
        <HStack>
          <Badge colorScheme="green" p={2} borderRadius="md" fontSize="sm">
            ${flight.price}
          </Badge>
        </HStack>
      </HStack>

      {/* Bottom Row */}
      <Stack spacing={2} p={2}>
        <HStack spacing={4}>
          <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={2} flex="1">
            <Text fontSize="xs" color="gray.500">Destination</Text>
            <Text fontSize="sm" fontWeight="bold">{flight.destination}</Text>
          </Box>
          <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={2} flex="1">
            <Text fontSize="xs" color="gray.500">Departure</Text>
            <Text fontSize="sm" fontWeight="bold">{flight.departure}</Text>
          </Box>
          <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={2} flex="1">
            <Text fontSize="xs" color="gray.500">Arrival</Text>
            <Text fontSize="sm" fontWeight="bold">{flight.Return}</Text>
          </Box>
        </HStack>
        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="white" bg={getClassBgColor(flight.class)} borderRadius="md" px={2} py={1}>
            {flight.class}
          </Text>
          <Button colorScheme="blue" onClick={handleBookFlight}>Book</Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default FlightCard;
