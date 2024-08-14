import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.mjs";

export default merge(commonConfig, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
});
