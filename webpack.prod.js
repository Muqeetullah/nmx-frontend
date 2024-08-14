// webpack/webpack.prod.js
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "production",
  devtool: "source-map", // Include external source maps for production
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    sourceMapFilename: "[file].map", // Output the source maps separately
  },
});
