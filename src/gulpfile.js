var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var sourcepaths = {
    scripts: ['coffee/**/*.coffee'],
    styles: 'scss/**/*.scss'
};
var destinationpaths = {
    js: './app/scripts',
    css: './app/styles'
}

gulp.task('default', ['build']);

//gulp.task('default', ['clean', 'scripts', 'sass']);

gulp.task('build', function (done) {
    runSequence('clean',
        ['scripts', 'sass'],
    done);
});

gulp.task('clean', function (done) {
    return del([
        destinationpaths.js,
        destinationpaths.css
    ], done);
});

gulp.task('scripts', function () {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(sourcepaths.scripts)
      .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(destinationpaths.js));
});

function changeLogger(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');    
}
gulp.task('watch', function () {
    gulp.watch(sourcepaths.scripts, ['scripts']).on('change', changeLogger);
    gulp.watch(sourcepaths.styles, ['sass']).on('change', changeLogger);
});

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed' // 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
    return gulp
      // Find all `.scss` files
      .src(sourcepaths.styles)
      .pipe(sourcemaps.init())
      // Run Sass on those files
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(sourcemaps.write('maps'))
      // Write the resulting CSS in the output folder
      .pipe(gulp.dest(destinationpaths.css));
});