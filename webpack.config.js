var path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ['./src/js/main.js']
    },
    devServer: {
        contentBase: "src/"
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // Babel loader
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?optional[]=runtime'
            },

            {
                test: /\.json$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '']
    }
}