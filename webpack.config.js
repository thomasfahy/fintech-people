const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require("fs");

function generateJobHtmlPlugins() {
  const jobPagesDir = path.resolve(__dirname, 'src/jobs');
  const files = fs.readdirSync(jobPagesDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));

  return htmlFiles.map(file => {
    return new HtmlWebpackPlugin({
      template: path.resolve(jobPagesDir, file),
      filename: `jobs/${file}`,
      chunks: ["htmlHead","jobListing"], // or add a dedicated "job" entry
    });
  });
}

module.exports = {
  mode: "development",
  entry: {
    index: "./src/scripts/index.js",
    htmlHead: "./src/modules/htmlHead.js",
    contact: "./src/scripts/contact.js",
    dashboard: "./src/scripts/dashboard.js",
    candidates: "./src/scripts/candidates.js",
    jobListing: "./src/scripts/job-listing.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/**/*.html"],
    port: 3000,
    hot: true,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3001",
        changeOrigin: true,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/template.html",
      chunks: ["htmlHead", "index"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/contact.html",
      chunks: ["htmlHead", "contact"],
      filename: "contact.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/fintechadmin.html",
      chunks: ["dashboard"],
      filename: "fintechadmin.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/candidates.html",
      chunks: ["htmlHead", "candidates"],
      filename: "candidates.html",
    }),

    ...generateJobHtmlPlugins()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: { filename: 'images/[name][hash][ext][query]' }
      },
    ],
  },
};
