module.exports = {
    "devtool": 'inline-source-map',
    "mode": "development",
    "entry": "./client/src/index.js",
    "output": {
        "path": __dirname + 'client/dist',
        "filename": "[name].[chunkhash:8].js"
    },
    "module": {
        "rules": [
            {
                "enforce": "pre",
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": "eslint-loader"
            },
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "loader": "babel-loader",
                "query": { "presets": ["@babel/preset-env", "@babel/preset-react"] }
            }
        ]
    }
}