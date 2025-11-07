module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@presentation': './src/presentation',
        '@domain': './src/domain',
        '@infrastructure': './src/infrastructure',
        '@application': './src/application',
        '@infra': './src/infrastructure',
        '@data': './src/data',
      },
    }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
  ],
};
