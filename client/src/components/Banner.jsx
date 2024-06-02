// components/Banner.js
import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const Banner = ({ imageUrl, heading, subtitle }) => {
  return (
    <Box
      position="relative"
      height="300px"
      backgroundImage={`url(${imageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.6)"
      />
      <VStack position="relative" zIndex="1">
        <Text fontSize="4xl" fontWeight="bold" textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)">
          {heading}
        </Text>
        <Text fontSize="xl" textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)">
          {subtitle}
        </Text>
      </VStack>
    </Box>
  );
};

export default Banner;
