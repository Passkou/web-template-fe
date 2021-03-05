module.exports = {
  purge: [
    './src/**/*.tsx',
    './src/**/*.jsx',
    './src/**/*.html',
    './src/**/*.ejs'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  plugins: []
};
