var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./lib/conf.js')
        .bundle()
        .pipe(source('conf.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch('./lib/**/*.js', ['browserify']);
});

gulp.task('compile', ['browserify']);
gulp.task('default', ['compile', 'watch']);