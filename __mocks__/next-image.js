/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');

function NextImage(props) {
  // Return a plain img for tests
  const { src, alt, width, height, style, priority, placeholder, blurDataURL, ...rest } = props;
  return React.createElement('img', { src, alt, width, height, style, ...rest });
}

module.exports = NextImage;
