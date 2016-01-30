var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();
var addsrc = require('gulp-add-src');
var rename = require('gulp-rename');

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
    browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
};

var sourcepaths = {
    // add all .coffee files that should be bundled in all.min.js
    coffeeScriptsToBeBundled: ['scripts/coffee/common.coffee', 'scripts/coffee/**/*.coffee'],
    // add all .js files that should be bundled in all.min.js
    scriptsToBeBundled: ['scripts/js/**/*.js', 
            'components/version/version.js',
            'components/version/version-directive.js',
            'components/version/interpolate-filter.js',
            'app/bower_components/jquery.gritter/js/jquery.gritter.js'],
    // add all .js filed that should be copied to src/app/scripts
    scriptsToBeDeployed: [
            'app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
    styles: 'scss/app.scss',
    stylesToBeDeployed: [
            'app/bower_components/bootstrap/dist/css/bootstrap.min.css'			
        ]
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
    runSequence(['clean','sass-prepare'],['scripts', 'sass'],'watch',
    done);
});

gulp.task('clean', function (done) {
    return del([
        destinationpaths.js,
        destinationpaths.css
    ], done);
});

gulp.task('scripts', function () {
    // copy scripts to scripts folder
    var copyObj = gulp.src(sourcepaths.scriptsToBeDeployed);
    if (options.minify)
        copyObj = copyObj.pipe(uglify());
    copyObj.pipe(gulp.dest(destinationpaths.js));

    // bundle for processing and concatenating .coffee and .js files and storing the results to scripts/all.min.js
    var obj = gulp.src(sourcepaths.coffeeScriptsToBeBundled)
        .pipe(sourcemaps.init())
        .pipe(coffee({ bare: false, header: false }))
        .pipe(addsrc(sourcepaths.scriptsToBeBundled));
      
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

gulp.task('sass-prepare', function () {
// rename jquery.gritter.css to jquery.gritter.scss so that it is included in app.css
	 return gulp.src("./app/bower_components/jquery.gritter/css/jquery.gritter.css")
		.pipe(rename(function (path) {
		path.extname = ".scss"
		}))
		.pipe(gulp.dest("./app/bower_components/jquery.gritter/css/"));  
});
		
gulp.task('sass', function () {	  
    // copy styles to styles folder
    var copyObj = gulp.src(sourcepaths.stylesToBeDeployed);
    copyObj.pipe(gulp.dest(destinationpaths.css));
  
    // bundle for processing and concatenating .scss and .css files and storing the results to styles/app.css
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
    gulp.watch(sourcepaths.coffeeScriptsToBeBundled, ['scripts']);
    gulp.watch(sourcepaths.scriptsToBeBundled, ['scripts']);
    gulp.watch("scss/**/*.scss", ['sass']);
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
