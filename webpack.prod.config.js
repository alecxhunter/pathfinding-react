var config = {
   entry: './src/app.js',
	
   output: {
      path: __dirname + '/static',
	  publicPath: '/static/',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react'/*, 'react-hmre'*/]
            }
         }
      ]
   }
}

module.exports = config;