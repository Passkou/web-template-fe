const config = {
  presets: [
    [
      '@babel/preset-env',
      {}
    ],
    [
      '@babel/preset-react'
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true
      }
    ]
  ],
  plugins: [

  ]
};
if (process.env.NODE_ENV === 'development') {
  config.plugins.push('react-refresh/babel');
} else {
  config.presets[0][1].targets = 'defaults';
}
module.exports = config;
