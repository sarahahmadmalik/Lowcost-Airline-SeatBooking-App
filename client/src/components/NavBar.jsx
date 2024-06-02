import { Box, Button, Container, HStack, Heading } from '@chakra-ui/react';

const NavBar = () => (
  <Box as="nav" bg="white">
    <Container maxW="container.lg" py={4}>
      <HStack justify="space-between">
        <Heading size="md" color="black" fontFamily="Poppins">FLIGHT.BOOKING</Heading>
        <HStack spacing={8}>
          <Button
            variant="link"
            color="gray.500"
            fontWeight="400"
            _hover={{ color: 'blue.500', transition: 'color 0.3s' }}
            fontFamily="Poppins"
          >
            Home
          </Button>
          {/* <Button
            variant="link"
            color="gray.500"
            fontWeight="400"
            _hover={{ color: 'blue.500', transition: 'color 0.3s' }}
            fontFamily="Poppins"
          >
            About
          </Button> */}
          <Button
            variant="link"
            color="gray.500"
            fontWeight="400"
            _hover={{ color: 'blue.500', transition: 'color 0.3s' }}
            fontFamily="Poppins"
          >
            Offers
          </Button>
          {/* <Button
            variant="link"
            color="gray.500"
            fontWeight="400"
            _hover={{ color: 'blue.500', transition: 'color 0.3s' }}
            fontFamily="Poppins"
          >
            Seats
          </Button> */}
          <Button
            variant="link"
            color="gray.500"
            fontWeight="400"
            _hover={{ color: 'blue.500', transition: 'color 0.3s' }}
            fontFamily="Poppins"
          >
            Destination
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            borderRadius="full"
                        px={6}
                        fontWeight={500}
            fontFamily="Poppins"
          >
            Login
          </Button>
        </HStack>
      </HStack>
    </Container>
  </Box>
);

export default NavBar;
