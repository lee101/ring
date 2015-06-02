'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpPlugins = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

var errorHandler = function (err) {
    gutil.log(err);
    if (process.env.CI) {
        process.exit(1);
    }
    this.emit('end');
};

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {

    return gulp.src('app/styles/main.less')
        .pipe(gulpPlugins.less())
        .on('error', errorHandler)

        .pipe(gulpPlugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulpPlugins.cssmin())
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulpPlugins.size({title: 'styles'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src([
        'app/scripts/**/*.js',
        'app/elements/**/*.js',
        'app/elements/**/*.html'
    ])
        .pipe(gulpPlugins.jshint.extract()) // Extract JS from .html files
        .pipe(gulpPlugins.jshint())
        .pipe(gulpPlugins.jshint.reporter('jshint-stylish'))
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulpPlugins.cache(gulpPlugins.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(gulpPlugins.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
    var app = gulp.src([
        'app/*',
        '!app/test'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    var bower = gulp.src([
        'bower_components/**/*'
    ]).pipe(gulp.dest('dist/bower_components'));

    var elements = gulp.src(['app/elements/**/*.html'])
        .pipe(gulp.dest('dist/elements'));

    var scripts = gulp.src(['app/scripts/**/*.js'])
        .pipe(gulp.dest('dist/scripts'));

    var vulcanized = gulp.src(['app/elements/elements.html'])
        .pipe(gulpPlugins.rename('elements.vulcanized.html'))
        .pipe(gulp.dest('dist/elements'));

    return merge(app, bower, scripts, elements, vulcanized).pipe(gulpPlugins.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulpPlugins.size({title: 'fonts'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
    var assets = gulpPlugins.useref.assets({searchPath: ['.tmp', 'app', 'dist']});

    return gulp.src(['app/**/*.html', '!app/{elements,test}/**/*.html'])
        // Replace path for vulcanized assets
        .pipe(gulpPlugins.if('*.html', gulpPlugins.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
        .pipe(assets)
        // Concatenate And Minify JavaScript
        .pipe(gulpPlugins.if('*.js', gulpPlugins.uglify({preserveComments: 'some'})))
        // Concatenate And Minify Styles
        // In case you are still using useref build blocks
        .pipe(gulpPlugins.if('*.css', gulpPlugins.cssmin()))
        .pipe(assets.restore())
        .pipe(gulpPlugins.useref())
        // Minify Any HTML
        .pipe(gulpPlugins.if('*.html', gulpPlugins.minifyHtml({
            quotes: true,
            empty: true,
            spare: true
        })))
        // Output Files
        .pipe(gulp.dest('dist'))
        .pipe(gulpPlugins.size({title: 'html'}));
});

// Vulcanize imports
gulp.task('vulcanize', function () {
    var DEST_DIR = 'dist/elements';

    return gulp.src('dist/elements/elements.vulcanized.html')
        .pipe(gulpPlugins.vulcanize({
            dest: DEST_DIR,
            strip: true,
            inline: true
        }))
        .pipe(gulp.dest(DEST_DIR))
        .pipe(gulpPlugins.size({title: 'vulcanize'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


gulp.task('nunjucks', function () {
    gulp.src('./views/shared/**/*.jinja2')
        .pipe(gulpPlugins.minifyHtml({
            quotes: true,
            empty: true,
            spare: true
        }))
        .pipe(gulpPlugins.nunjucks())
        .on('error', errorHandler)
        .pipe(gulpPlugins.concat('templates.js'))
        .pipe(gulp.dest('./app/scripts/templates'));
});

// Build Production Files, the Default Task
gulp.task('build', ['clean'], function (cb) {
    runSequence(
        ['nunjucks'],
        ['copy', 'styles'],
        ['images', 'fonts'],
        //'vulcanize',
        cb);
});

gulp.task('default', ['build'], function (cb) {
    gulp.watch('./views/shared/**/*.jinja2', ['nunjucks']);
    gulp.watch(['app/styles/**/*.{less,css}'], ['styles']);
    gulp.watch(['app/{scripts,elements}/**/*'], ['copy']);
    gulp.watch(['app/images/**/*'], ['images']);
    gulp.watch(['app/fonts/**/*'], ['fonts']);
});

// Load custom tasks from the `tasks` directory
try {
    require('require-dir')('tasks');
} catch (err) {
}
