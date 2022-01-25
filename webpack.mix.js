const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

 mix.ts("resources/js/index.tsx","public/js/")
    .extract(['react'])
    .postCss("resources/css/app.css", "public/css/app.css", [
        require("tailwindcss")
    ])
    .postCss("resources/css/roboto.css", "public/css/roboto.css")
    .postCss("resources/css/bootstrap-icons.css", "public/css/bootstrap-icons.css")

mix.ts('resources/js/blog/Header.tsx', 'public/js/header.js')
    .extract(['react'])