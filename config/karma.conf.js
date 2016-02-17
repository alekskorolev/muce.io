var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
    path = require('path'),
    coverage = process.env.npm_config_cV,
    reporters = ['progress'],
    loaders = [
        {test: /\.js$/, loader: 'babel'},
        {test: /\.html$/, loader: 'ehogan'}
    ];

if (coverage) {
    reporters.push('coverage');
    loaders.unshift({test: /^(?!.*(node_modules|test)).*\.js$/, loader: 'istanbul-instrumenter'});
}

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['mocha'],
        client: {
          mocha: {
          }
        },
        exclude: [
            './node_modules/*'
        ],
        files: [
            // test cases
            '../tests/**/*.spec.js',
        ],

        reporters: reporters,

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'PhantomJS'
        ],
        singleRun: false,
        preprocessors: {
            '../**/*.spec.*': ['webpack']
        },
        webpack: {
            output: {
                path: 'build/'
            },
            devtool: 'source-map',
            debug: true,
            resolve: {
                root: [path.join(__dirname, '/../')]
            },
            module: {
                loaders: loaders
            },
            plugins: [
                new DedupePlugin()
            ]
        },
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir : '../coverage/',
            reporters: [
                { type: 'html', subdir: 'html' }
            ]
        }
    })
}
