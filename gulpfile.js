var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var exec = require('child_process').exec;


gulp.task('empty-app-folder', function () {
  del([
    'app/**/*',
    '!app/.keep'
  ]);
});


gulp.task('raw-copy', ['empty-app-folder'], function () {
  return gulp.src([
    'app-dev/**',

    '!app-dev/css/**',
    '!app-dev/js/**',
    '!app-dev/lib',
    '!app-dev/lib/**',
    '!app-dev/**/assets',
    '!app-dev/**/assets/**'
    ])
    .pipe(gulp.dest('app/'))
});


gulp.task('css-app', ['empty-app-folder'], function () {
  return gulp.src([
    'app-dev/lib/normalize.custom.css',

    'app-dev/lib/emojify-base.min.css',
    'app-dev/lib/emojify-emoticons.min.css',
    'app-dev/lib/emojify.min.css',

    'app-dev/lib/material.min.css',
    'app-dev/lib/getmdl-select.min.css',

    'app-dev/css/lib-overwrite.css',
    'app-dev/css/fonts.css',
    'app-dev/css/global.css',
    'app-dev/css/header.css',
    'app-dev/css/workspace.css',
    'app-dev/css/wysiwyg-content.css',
    'app-dev/css/toolbar.css',
    'app-dev/css/context-info.css',
    'app-dev/css/dialogs.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('app/css/'))
});


gulp.task('js-app', ['empty-app-folder'], function () {
  return gulp.src([
    'app-dev/js/modules.js',

    'app-dev/lib/material.min.js',
    'app-dev/lib/getmdl-select.min.js',
    'app-dev/lib/versions-compare.js',
    'app-dev/lib/foreach.min.js',
    'app-dev/lib/LightRange.ES6.js',
    'app-dev/lib/wysiwyg.min.js',
    'app-dev/lib/Sortable.no-loader.min.js',
    'app-dev/lib/mousetrap.min.js',
    'app-dev/lib/mousetrap-global-bind.min.js',
    'app-dev/lib/purify.no-loader.min.js',
    'app-dev/lib/Countable.js',
    'app-dev/lib/findAndReplaceDOMText.no-loader.js',
    'app-dev/lib/emojify.min.js',
    'app-dev/lib/zenscroll.no-loader.min.js',
    'app-dev/lib/reqwest.no-loader.min.js',
    'app-dev/lib/to-markdown.custom.js',
    'app-dev/lib/marked.min.js',
    'app-dev/lib/jsVideoUrlParser.min.js',

    'app-dev/js/functions/IO.functions.js',
    'app-dev/js/functions/Window.functions.js',
    'app-dev/js/functions/Utils.functions.js',
    'app-dev/js/functions/Documents.functions.js',
    'app-dev/js/functions/Content.functions.js',
    'app-dev/js/functions/Toolbar.functions.js',
    'app-dev/js/functions/Dialogs.functions.js',
    'app-dev/js/functions/Remote.functions.js',

    'app-dev/js/classes/Document.class.js',

    'app-dev/js/init.js',
    'app-dev/js/window.js',
    'app-dev/js/tabs.js',
    'app-dev/js/toolbar.js',
    'app-dev/js/context-info.js',
    'app-dev/js/dialogs.js',
    'app-dev/js/save.js',
    'app-dev/js/search.js',
    'app-dev/js/settings.js',
    'app-dev/js/remote-check.js'
    ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('app/js/'))
});


gulp.task('html-app', ['raw-copy'], function () {
  return gulp.src([
    'app/views/main.html'
    ])
    .pipe(replace(/<!-- gulp-replace: css start -->[\s\S]+<!-- gulp-replace: css end -->/, '<link rel="stylesheet" href="../css/style.css">'))
    .pipe(replace(/<!-- gulp-replace: js start -->[\s\S]+<!-- gulp-replace: js end -->/, '<script src="../js/script.js"></script>'))
    .pipe(gulp.dest('app/views/'))
});




gulp.task('default', ['empty-app-folder', 'raw-copy', 'css-app', 'js-app', 'html-app']);




gulp.task('empty-dist-folder', function () {
  del([
    'dist/**/*',
    '!dist/.keep'
  ]);
});


gulp.task('dist', ['empty-dist-folder'], function (cb) {

  var strCommand = '';
  if (/^win/.test(process.platform)) {
    strCommand = 'node_modules\\.bin\\build';
  } else {
    strCommand = 'node_modules/.bin/build';
  }

  // https://github.com/robrich/gulp-exec#usage
  exec(strCommand, function (err, stdout, stderr) {
    if (err) {
      cb(err);
    } else {
      console.log(stdout);
    }
    // console.log(stderr);
  });
});
