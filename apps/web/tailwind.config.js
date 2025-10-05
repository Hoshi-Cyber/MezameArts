const tokens = require('../../packages/ui/src/tokens.json');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      borderRadius: tokens.radius
    }
  },
  plugins: [],
};
