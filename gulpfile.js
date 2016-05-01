
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

var packageMeta = require('./package.json');

var source = [
    'src/js/vendor/*.js',
    'src/js/*.js',
    'src/js/*/*.js',
    'src/js/*/*/*.js',
    'src/js/*/*/*/*.js'
];

gulp.task('js', function() {
    return gulp.src(source)
        .pipe(sourcemaps.init())
            .pipe(concat('script.js'))
            .pipe(gulp.dest('js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
    return sass('src/sass/base.scss', { style: 'expanded' })
        .on('error', function (error) {
            console.error(error.message);
        })
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9', '> 1%'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(minifyCSS({ processImport: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch(source, function() {
        setTimeout(function () {
            gulp.start('js');
        }, 100);
    });
    gulp.watch('src/sass/**.scss', function() {
        setTimeout(function () {
            gulp.start('sass');
        }, 100);
    });
});

gulp.task('build', ['js', 'sass']);
gulp.task('default', ['watch', 'build']);
