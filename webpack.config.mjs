import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV !== 'production';
const isGhPages = process.env.GH_PAGES === 'true';

export default {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: isDev ? '/' : isGhPages ? '/TicTacChat/' : './',
    clean: true,
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },      
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: true,
              importLoaders: 1,
              modules: {
                namedExport: false
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', ".mjs"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: "public", 
          to: "", 
          globOptions: { 
            ignore: ["**/index.html"]
          } 
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.GH_PAGES': JSON.stringify(isGhPages)
    })
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'public'),
    },
    compress: true,
    port: 3000,
    open: true
  },
  mode: 'development'
};