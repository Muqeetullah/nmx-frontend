// webpack/webpack.dev.js
import { merge } from "webpack-merge";
import webpack from "webpack"; // Import webpack to use its HMR plugin
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Include source maps for easier debugging
  devServer: {
    static: {
      directory: "./dist",
    },
    compress: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true, // This ensures that files are written to disk, which is necessary for the service worker
    },
    open: true,
    hot: true, // Enable Hot Module Replacement
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Add HMR plugin
  ],
});
