const path = require("path");

module.exports = ({config}) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "@": apth.resolve(__dirname, "../src"),
    };

    return config;
}