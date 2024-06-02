import { Box, Heading } from '@chakra-ui/react';

const HeroHeading = ({ children }) => (
  <Box bg="gray.50" p={20} borderRadius="md">
    <Heading fontSize={30} textAlign="center" color="gray.600">
      {children}
    </Heading>
  </Box>
);

export default HeroHeading;
