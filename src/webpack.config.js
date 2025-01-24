module.exports = {
    module: {
      rules: [
        {
          test: /\.(eot|woff|woff2|ttf|svg)$/, // Match font file extensions
          type: 'asset/resource', // Replaces 'file-loader' in Webpack 5
          generator: {
            filename: 'fonts/[name][ext]', // Specify the output folder for font files
          },
        },
      ],
    },
  };
  