var path = require('path'),
    fs = require('fs');

fs.exists(path.join(__dirname, '/../local.config.js'), function(exist) {
    if (!exist) {
        fs.closeSync(fs.openSync(path.join(__dirname, '/../local.config.js'), 'w+'));
    }
});

module.exports = {
    context: path.join(__dirname + '/..'),
    entry: {
        'index': '../index.js'
    },
    output: {
        path: path.join(__dirname, '../js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'ehogan'},
            {test: /\.js$/, loader: 'babel'},
            {test: /\.scss$/, loaders: ["style", "css", "sass"]}
        ]
    },
    resolve: {
        root: [path.join(__dirname, '/../')]
    },
    devtool: 'source-map',
    debug: true,
    plugins: [
        new webpack.optimize.DedupePlugin()
    ]
}
