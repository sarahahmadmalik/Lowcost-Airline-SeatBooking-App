import { Box, Container, Heading, Input, Button, Stack } from '@chakra-ui/react';

const Subscribe = () => (
  <Box bg="gray.100" py={20}>
    <Container maxW="container.lg">
      <Stack spacing={6} textAlign="center">
        <Heading size="lg">Subscribe to our newsletter & get latest news</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center">
          <Input placeholder="Enter your email here" size="lg" />
          <Button colorScheme="blue" size="lg">Subscribe</Button>
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default Subscribe;
