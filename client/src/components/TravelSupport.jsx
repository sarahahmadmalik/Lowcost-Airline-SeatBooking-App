import { Box, Container, Heading, Stack, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { FaCalendarCheck, FaClipboardList, FaPiggyBank } from 'react-icons/fa';
import Slide from 'react-reveal/Slide';

const TravelSupport = () => (
  <Box py={20}>
    <Container maxW="container.lg">
      <Heading  size="lg" textAlign="center" mb={3}>Plan your travel with confidence</Heading>
      <Heading fontSize={20} mb={"10"} textAlign="center" color="gray.600">Find help with your bookings and travel plans, and see what to expect along your journey.</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Slide left>
          <Stack spacing={6}>
            <Image src="/plan-1.jpg" borderRadius="md" boxShadow="lg" />
            <Text fontWeight="bold">Travel Requirements</Text>
            <Text>Stay informed and prepared for your trip with essential travel requirements, ensuring a smooth and hassle-free experience in this vibrant and captivating city.</Text>
          </Stack>
        </Slide>
        <Slide bottom>
          <Stack spacing={6}>
            <Image src="/plan-2.jpg" borderRadius="md" boxShadow="lg" />
            <Text fontWeight="bold">Multi-risk Travel Insurance</Text>
            <Text>Stay informed and prepared for your trip with essential travel requirements, ensuring a smooth and hassle-free experience in vibrant and captivating city.</Text>
          </Stack>
        </Slide>
        <Slide right>
          <Stack spacing={6}>
            <Image src="/plan-3.jpg" borderRadius="md" boxShadow="lg" />
            <Text fontWeight="bold">Travel Requirements by Destinations</Text>
            <Text>Stay informed and prepared for your trip with essential travel requirements, ensuring a smooth and hassle-free experience in this vibrant and captivating city.</Text>
          </Stack>
        </Slide>
      </SimpleGrid>
    </Container>
  </Box>
);

export default TravelSupport;
