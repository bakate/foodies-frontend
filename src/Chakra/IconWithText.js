import { Box, SimpleGrid, Text } from '@chakra-ui/core';
import React from 'react';
import { FaRegHandshake, FaRegThumbsUp } from 'react-icons/fa';
import { FiTruck } from 'react-icons/fi';
import { GiReceiveMoney } from 'react-icons/gi';

const IconWithText = () => (
  <SimpleGrid
    pt={4}
    spacing="25px"
    minChildWidth="200px"
    px={8}
    my={4}
    bgImage="url('/images/banner.jpg')"
    bgPos="center"
    bgSize="cover"
    // style={{ filter: 'grayscale(80%)' }}
    bgRepeat="no-repeat"
  >
    <Box>
      <Box as={FaRegThumbsUp} color="gray.200" size="6rem" mx="auto" />
      <Text>
        Nous réduisons vos coûts d’achat sur des références actuelles{' '}
      </Text>
    </Box>
    <Box>
      <Box as={FaRegHandshake} color="gray.200" size="6rem" mx="auto" />
      <Text>
        Nous trouvons les composants critiques, sous allocations ou obsolètes{' '}
      </Text>
    </Box>
    <Box>
      <Box as={GiReceiveMoney} color="gray.200" size="6rem" mx="auto" />
      <Text>Nous rachetons vos excédents de stock </Text>
    </Box>

    <Box>
      <Box as={FiTruck} color="gray.200" size="6rem" mx="auto" />
      <Text>Nous livrons sous 1 semaine </Text>
    </Box>
  </SimpleGrid>
);

export default IconWithText;
