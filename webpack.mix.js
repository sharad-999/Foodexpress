let mix = require('laravel-mix');

// mix.js('resources/js/app.js', 'public/js/app.js').setPublicPath('dist');
mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/app.css');
mix.sass('resources/scss/Login.scss','public/css/Login.css')
mix.sass('resources/scss/boxing.scss','public/css/boxing.css')
mix.sass('resources/scss/signup.scss','public/css/signup.css')