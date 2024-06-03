import React from 'react';
import { Box, Container, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react';
import { FaCalendarCheck, FaClipboardList, FaPiggyBank } from 'react-icons/fa';
import Slide from 'react-reveal/Slide';

const TravelMemories = () => (
  <Box bg="gray.50" py={20}>
    <Container maxW="container.lg">
      <Heading size="lg" textAlign="center" mb={10}>Travel to make memories all around the world</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Slide bottom>
          <Stack spacing={6} align="center">
            <Icon as={FaCalendarCheck} w={12} h={12} color="blue.600" />
            <Text fontWeight="bold">Book & Relax</Text>
            <Text textAlign="center">Introducing Smart Checklist with us, the innovative solution revolutionizing the way you travel with our airline.</Text>
          </Stack>
        </Slide>
        <Slide bottom>
          <Stack spacing={6} align="center">
            <Icon as={FaClipboardList} w={12} h={12} color="blue.600" />
            <Text fontWeight="bold">Smart Checklist</Text>
            <Text textAlign="center">With "Book and Relax", you can sit back, unwind, and enjoy the journey while we take care of everything else.</Text>
          </Stack>
        </Slide>
        <Slide bottom>
          <Stack spacing={6} align="center">
            <Icon as={FaPiggyBank} w={12} h={12} color="blue.600" />
            <Text fontWeight="bold">Save More</Text>
            <Text textAlign="center">From discounted ticket prices to exclusive promotions and deals, we prioritize affordability without compromising on quality.</Text>
          </Stack>
        </Slide>
      </SimpleGrid>
    </Container>
  </Box>
);

export default TravelMemories;
