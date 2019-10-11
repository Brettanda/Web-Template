const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const mix = require("laravel-mix");
const stylelint = require("laravel-mix-stylelint");
const eslint = require("laravel-mix-eslint");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

try {
  path.resolve("./config/local.yml");
} catch (err) {
  console.error(
    "\n⚠ Local config not found. Please create the file: config/local.yml before starting development. See README.md for more info.\n"
  );
  process.exit();
}

const config = YAML.parse(fs.readFileSync("./config/local.yml", "utf-8"));

mix
  .browserSync({
    proxy: config.url, // Set the development URL in config/local.yml
    port: "4000",
    files: [
      // Reload when assets or views are modified
      "assets/**/*",
      "*.php"
    ],
    ignore: ["**/node_modules/**", "**/vendor/**", ".gitkeep"],
    open: false, // Don't open new browser tab
    reloadDelay: 1000, // Wait 2s before loading
    reloadDebounce: 100 // Wait 2s after loading before polling for changes
  })
  .extract(["jquery", "prismjs", "swup", "@swup/preload-plugin"])

  .js("assets/src/scripts/main.js", "scripts")

  .eslint({
    enforce: "pre",
    test: ["js", "vue"],
    exclude: ["node_modules"],
    loader: "eslint-loader",
    options: {
      fix: true,
      cache: false
    }
  })

  .sass("assets/src/styles/main.scss", "styles")

  .stylelint({
    configFile: path.join(__dirname, ".stylelintrc"),
    context: "assets",
    syntax: "scss"
  })

  .setPublicPath("assets/dist")
  .copyDirectory("assets/src/fonts", "assets/dist/fonts")
  .copyDirectory("assets/src/images", "assets/dist/images")

  .options({
    processCssUrls: false // This is set so our URLs for fonts/images in the stylesheet are correct.
  });
/**
 * Production
 */
if (mix.inProduction()) {
  mix.version();
}
