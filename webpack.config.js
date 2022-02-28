const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const getBabelLoader = ({ browserslist, isProduction = false } = {}) => {
    return {
        loader: require.resolve('babel-loader'),
        options: {
            cacheDirectory: true,
            cacheCompression: isProduction,
            compact: isProduction,
            babelrc: false,
            configFile: false,
            presets: [
                [
                    require.resolve('@babel/preset-env'),
                    {
                        targets: browserslist,
                    },
                ],
                [require.resolve('@babel/preset-typescript')],
            ],
            plugins: [],
        },
    };
};

const getPlugins = ({ isProduction }) => {
    return [
        ...(isProduction
            ? []
            : [
                  new ESLintPlugin({
                      extensions: ['js', 'ts'],
                      eslintPath: require.resolve('eslint'),
                      context: path.resolve('.'),
                      // ESLint class options
                      resolvePluginsRelativeTo: __dirname,
                      cwd: path.resolve('.'),
                      cache: true,
                  }),
                  new ForkTsCheckerWebpackPlugin({ async: true, formatter: 'basic' }),
              ]),

        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'manifest.json'), to: path.resolve(__dirname, 'dist') },
                { from: path.resolve(__dirname, 'src', 'assets'), to: path.resolve(__dirname, 'dist', 'assets') },
            ],
        }),
    ].filter(Boolean);
};

module.exports = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    const options = {
        isProduction,
        browserslist: isProduction
            ? `> 0.5%, not IE 11, Firefox ESR, Safari 11`
            : 'last 1 chrome version, last 1 firefox version, last 1 safari version',
    };

    return {
        target: options.isProduction ? `browserslist:${options.browserslist}` : 'web', // dev-server bug https://github.com/webpack/webpack-dev-server/issues/2812
        mode: options.isProduction ? 'production' : 'development',
        bail: options.isProduction,
        devtool: options.isProduction ? 'source-map' : 'cheap-module-source-map',
        watchOptions: {
            ignored: /node_modules|(i18n\/*.json)|\*\.(gif|jpeg|jpg|ico|png)/,
            aggregateTimeout: 600,
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        entry: {
            index: './src/index.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        cache: {
            type: 'filesystem',
            cacheDirectory: path.resolve('./node_modules/.cache/webpack'),
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [__filename],
            },
        },
        module: {
            strictExportPresence: true, // Make missing exports an error instead of warning
            rules: [
                {
                    test: /\.js$|\.ts?$/,
                    exclude: path.resolve('node_modules'),
                    use: getBabelLoader(options),
                },
            ],
        },
        plugins: getPlugins(options),
    };
};
