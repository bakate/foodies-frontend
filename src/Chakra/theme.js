import defaultTheme from '@chakra-ui/theme'

const customTheme = {
  ...defaultTheme,
  layerStyles: {
    base: {
      bg: 'gray.50',
      border: '2px solid',
      borderColor: 'gray.500',
    },
    selected: {
      bg: 'teal.500',
      color: 'white',
      borderColor: 'orange.500',
    },
  },
  textStyles: {
    h1: {
      fontSize: ['36px', '48px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
      textTransform: 'capitalize',
      textAlign: ['left', 'center'],
    },
    h2: {
      fontSize: ['28px', '36px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
      marginX: [0, 'auto'],
      textTransform: 'capitalize',
    },
  },
}

export default customTheme
