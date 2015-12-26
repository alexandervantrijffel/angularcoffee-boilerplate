var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: ['app/coffee/**/*.coffee'],
    images: 'app/img/**/*'
};

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('scripts', [], function () {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(paths.scripts)
      .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/js'));
});