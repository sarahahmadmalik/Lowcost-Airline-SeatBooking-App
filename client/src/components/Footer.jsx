import { Box, Button, SimpleGrid, Container, Heading, Image, Stack, Text, Link, HStack, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <Box bg="blue.600" color="white" py={10}>
    <Container maxW="container.lg">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Stack>
          <Heading size="md">FLIGHT.BOOKING</Heading>
          <Text>Where excellence takes flight. With a strong commitment to customer satisfaction and a passion for air travel, Hirun Airlines offers exceptional service and seamless journeys.</Text>
        </Stack>
        <Stack>
          <Heading size="md">INFORMATION</Heading>
          <HStack spacing={4}>
            <Link>Home</Link>
            <Link>Offers</Link>
            <Link>Destinations</Link>
          </HStack>
        </Stack>
        <Stack>
          <Heading size="md">CONTACT</Heading>
          <HStack spacing={4}>
            <Link href="https://www.facebook.com" isExternal>
              <Icon as={FaFacebook} w={6} h={6} />
            </Link>
            <Link href="https://www.twitter.com" isExternal>
              <Icon as={FaTwitter} w={6} h={6} />
            </Link>
            <Link href="https://www.instagram.com" isExternal>
              <Icon as={FaInstagram} w={6} h={6} />
            </Link>
          </HStack>
        </Stack>
      </SimpleGrid>
    </Container>
    <Text textAlign="center" mt={10}>© 2024 FLIGHT.BOOKING. All rights reserved.</Text>
  </Box>
);

export default Footer;
