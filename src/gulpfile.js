var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var options = {
	minify: false,
	sass: {
		errLogToConsole: true,
		outputStyle: 'expanded' // 'compressed'
	}
}

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sourcepaths = {
    scripts: ['coffee/**/*.coffee'],
    styles: 'scss/**/*.scss'
};
var destinationpaths = {
    js: 'app/scripts',
    css: 'app/styles'
}
// Workaround for https://github.com/gulpjs/gulp/issues/71
// Another temporary solution until gulp 4
var origSrc = gulp.src;
gulp.src = function () {
    return fixPipe(origSrc.apply(this, arguments));
};
function fixPipe(stream) {
    var origPipe = stream.pipe;
    stream.pipe = function (dest) {
        arguments[0] = dest.on('error', function (error) {
            var nextStreams = dest._nextStreams;
            if (nextStreams) {
                nextStreams.forEach(function (nextStream) {
                    nextStream.emit('error', error);
                });
            } else if (dest.listeners('error').length === 1) {
                throw error;
            }
        });
        var nextStream = fixPipe(origPipe.apply(this, arguments));
        (this._nextStreams || (this._nextStreams = [])).push(nextStream);
        return nextStream;
    };
    return stream;
}

gulp.task('default', ['build', 'browser-sync']);

gulp.task('dist', function() {
	options.minify = true;
	options.sass.outputStyle = 'compressed';
	gulp.start('default');
})

gulp.task('build', function (done) {
    runSequence('clean',
        ['scripts', 'sass'],'watch',
    done);
});

gulp.task('clean', function (done) {
    return del([
        destinationpaths.js,
        destinationpaths.css
    ], done);
});

gulp.task('scripts', function () {
    // Minify if requested and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    var obj = gulp.src(['./coffee/common.coffee','./' + sourcepaths.scripts])
      .pipe(sourcemaps.init())
      .pipe(coffee({bare: false, header: false}));
	  
	if (options.minify)
		obj = obj.pipe(uglify());
	
	return obj
      .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest(destinationpaths.js))
      .pipe(browserSync.stream({ match: '**/*.js' }))
      .on('error', function (error) {
            console.error('' + error);
      })
});

gulp.task('sass', function () {
    return gulp
        // Find all `.scss` files
        .src(sourcepaths.styles)
        .pipe(sourcemaps.init())
        // Run Sass on those files
        .pipe(sass(options.sass).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('maps'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(destinationpaths.css))
        .pipe(browserSync.stream({ match: '**/*.css' }))
        .on('error', function (error) {
            console.error('' + error);
        });
});

function changeLogger(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');    
}
gulp.task('watch', function() {
    gulp.watch(sourcepaths.scripts, ['scripts']);
    gulp.watch(sourcepaths.styles, ['sass']);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./app"
        }
    });
});
