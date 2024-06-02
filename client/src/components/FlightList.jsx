import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import FlightCard from './FlightCard';

const FlightList = ({ flights }) => {
  return (
    <Box display="flex" width="100%" justifyContent="center" alignItems="center" height="100%">
      <Stack spacing={4} width="100%" alignItems="center">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </Stack>
    </Box>
  );
};

export default FlightList;
