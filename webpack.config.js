const path = require("path");

module.exports = function(env) {
    return {
        mode: env && env.production ? "production" : "development",
        context: path.resolve(__dirname, "src", "static"),
        entry: "./index.js",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist", "static")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-transform-react-jsx",
                                "@babel/plugin-proposal-class-properties"
                            ],
                            cacheDirectory: "tmp",
                            babelrc: false
                        }
                    }
                }
            ]
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".js", ".json"]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist", "static"),
            index: "index.html",
            compress: true,
            port: 9080,
            proxy: {
                "/api": "http://localhost:9081",
                "/static": {
                    target: "http://localhost:9080",
                    pathRewrite: {"^/static": ""}
                }
            },
            open: true,
            openPage: "static/index.html"
        }
    };
};
