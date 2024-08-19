import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.dev.js";
import path from "path";

const __dirname = path.resolve();
const PORT = process.env.PORT || 9000;
console.log(PORT);

// Compiler with webpack configuration
const compiler = Webpack(webpackConfig);

// Server configuration
const devServerOptions = {
  ...webpackConfig.devServer,
  open: true,
  hot: true,
  compress: true,
  historyApiFallback: true,
  static: {
    directory: path.join(__dirname, "dist"),
  },
};

// Create a new instance of WebpackDevServer
const server = new WebpackDevServer(devServerOptions, compiler);

// Start the server
server.startCallback(() => {
  console.log(`Dev server is running at http://localhost:${PORT}`);
});
