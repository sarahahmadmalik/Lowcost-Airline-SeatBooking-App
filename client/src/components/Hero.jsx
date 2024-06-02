import { Box, Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import Fade from 'react-reveal/Fade';

const Hero = () => {
  return (
    <Fade>
      <Box py={20}>
        <Container maxW="container.lg">
          <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="center">
            <Stack spacing={6}>
              <Heading size="2xl" textAlign="center" >
                Find and Book
                <br />
                <Text as="span" color="blue.600">A Great Experience</Text>
              </Heading>
              
              <Image src="/header.jpg" alt="Airplane" />
              
             
              {/* <Button colorScheme="blue" size="lg">Get Started</Button> */}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Fade>
  );
};

export default Hero;
