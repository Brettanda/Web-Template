# Web Template

This is a basic web development template with webpack.

## Default Features

- Laravel Mix
- Vagrant
- Normalize.css
- JQuery
- Prettier
- Eslint
- Stylelint
- SASS/SCSS Loaders

## File system

```
example.com
├── assets
|  ├── dist
│  └── src
│     ├── fonts
│     ├── plugins
│     ├── scripts
│     |  └── main.js
│     └── styles
|        ├── mixins
|        |  └── _breakpoints.scss
|        ├── _fonts.scss
│        └── main.scss
├── node_modules
├── index.html
├── package.json
├── webpack.config.js
├── README.md
└── .editorconfig
```

## CSS & JS Importing

When importing the JS and CSS files point the imports to the `assets/dist/` folder for the minified versions
