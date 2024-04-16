// config-overrides.js

const { useBabelRc, override } = require("customize-cra");
const { addWebpackPlugin } = require("customize-cra");

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = override(
  useBabelRc(),
  addWebpackPlugin(
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/srcSw.js",
      swDest: "sw.js",
    })
  )
);
