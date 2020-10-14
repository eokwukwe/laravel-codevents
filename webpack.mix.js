const mix = require("laravel-mix");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const config = {
    plugins: [new VuetifyLoaderPlugin(), new CaseSensitivePathsPlugin()]
};

mix.webpackConfig(config)

mix.js("resources/js/app.js", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);
