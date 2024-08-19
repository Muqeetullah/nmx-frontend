// webpack/webpack.prod.js
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin"; // Import here
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        {
          from: "public/images/icons/icon-128x128.png",
          to: "icon-192x192.png",
        },
        {
          from: "public/images/icons/icon-512x512.png",
          to: "icon-512x512.png",
        },
      ],
    }),
    new InjectManifest({
      swSrc: "./src/service-worker.js", // Path to your service worker source
      swDest: "service-worker.js",
      maximumFileSizeToCacheInBytes: 12 * 1024 * 1024, // Adjust if needed
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    sourceMapFilename: "[file].map", // Output the source maps separately
  },
});
