import defaultTheme from '@chakra-ui/theme'
// import { merge } from '@chakra-ui/utils'

// const breakpoints = ['360px', '768px', '1024px', '1440px']
// const [sm, md, lg, xl] = breakpoints
// 2. Extend the theme to include custom colors, fonts, etc.
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
      // you can also use responsive styles
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
      // textAlign: ['left', 'center'],
      marginX: [0, 'auto'],
      textTransform: 'capitalize',
    },
  },
  // sm,
  // md,
  // lg,
  // xl,
}

// const fonts = { ...chakraTheme.fonts, mono: `'JetBrains Mono', monospace` };

// breakpoints.sm = breakpoints[0]
// breakpoints.md = breakpoints[1]
// breakpoints.lg = breakpoints[2]
// breakpoints.xl = breakpoints[3]

export default customTheme
