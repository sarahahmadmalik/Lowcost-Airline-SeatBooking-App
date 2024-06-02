import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Icon, useBreakpointValue, Text, HStack, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaUser, FaCalendarAlt } from "react-icons/fa";
import Slide from 'react-reveal/Slide';
import { useNavigate } from 'react-router-dom';

const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose"
];

const FlightSearch = () => {
  const history = useNavigate();
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const [selectedClass, setSelectedClass] = useState("economy");
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travellers, setTravellers] = useState(0);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    // Perform form validation
    if (!origin || !destination || !travellers || !departureDate || !returnDate) {
      alert('Please fill in all required fields.');
      return;
    }

    // Proceed to flight list page if validation passes
    history(`/flight-list?origin=${origin}&destination=${destination}&travellers=${travellers}&departureDate=${departureDate}&returnDate=${returnDate}&class=${selectedClass}`);
  };

  return (
    <Slide bottom>
      <Box p={10} m={10} shadow="md" borderWidth="1px" borderRadius="md">
        <Flex direction="column" align="center" mb={8}>
          <HStack spacing={8} mb={5}>
            {["Economy Class", "Business Class", "First Class"].map((cls, index) => (
              <Text
                key={index}
                px={5}
                py={4}
                fontSize="lg"
                borderRadius="md"
                bg={selectedClass === cls.toLowerCase().split(" ")[0] ? "blue.500" : "gray.100"}
                color={selectedClass === cls.toLowerCase().split(" ")[0] ? "white" : "gray.700"}
                cursor="pointer"
                onClick={() => setSelectedClass(cls.toLowerCase().split(" ")[0])}
              >
                {cls}
              </Text>
            ))}
          </HStack>
        </Flex>
        <Stack direction={stackDirection} spacing={2} align="center">
          <FormControl id="origin">
            <FormLabel>
              <Icon as={FaMapMarkerAlt} mr={2} /> Origin
            </FormLabel>
            <Select placeholder="Select origin" value={origin} onChange={(e) => setOrigin(e.target.value)}>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="destination">
            <FormLabel>
              <Icon as={FaMapMarkerAlt} mr={2} /> Destination
            </FormLabel>
            <Select placeholder="Select destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
              {locations.filter(location => location !== origin).map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="travellers">
            <FormLabel>
              <Icon as={FaUser} mr={2} /> Travellers
            </FormLabel>
            <Input type="number" placeholder="Add guests" value={travellers} onChange={(e) => setTravellers(e.target.value)} />
          </FormControl>
          <FormControl id="departure">
            <FormLabel>
              <Icon as={FaCalendarAlt} mr={2} /> Departure
            </FormLabel>
            <Input type="date" placeholder="Add date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          </FormControl>
          <FormControl id="return">
            <FormLabel>
              <Icon as={FaCalendarAlt} mr={2} /> Return
            </FormLabel>
            <Input type="date" placeholder="Add date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" size="lg" onClick={handleSearch}>
            <Icon as={SearchIcon} />
          </Button>
        </Stack>
      </Box>
    </Slide>
  );
};

export default FlightSearch;
