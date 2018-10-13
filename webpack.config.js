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
                                "@babel/plugin-proposal-export-default-from",
                                ["@babel/plugin-proposal-optional-chaining", {loose: false}],
                                ["@babel/plugin-proposal-pipeline-operator", {proposal: "minimal"}],
                                ["@babel/plugin-proposal-nullish-coalescing-operator", {loose: false}],
                                ["@babel/plugin-proposal-decorators", {legacy: true}],
                                "@babel/plugin-proposal-export-namespace-from",
                                ["@babel/plugin-proposal-class-properties", {loose: true}]
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
                "/api": "http://localhost:8080",
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
