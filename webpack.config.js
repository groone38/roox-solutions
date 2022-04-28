const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: 
    // path.resolve(__dirname, '..', './src/index.tsx'),
    {
        
        main: "./src/index.tsx"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html")
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
                },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '../',
                        name: `img/[name].[ext]`
                    }
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: [
                {loader: 'file-loader'},
            ],
        },
        {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
        ],
      },
}