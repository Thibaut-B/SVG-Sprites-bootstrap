var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var path = require('path');

var svgSpritePath = "";

gulp.task('sprite', function() {
    return gulp
        .src(svgSpritePath+'sprite/*.svg')
        .pipe(svgmin(function(file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(cheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(svgSpritePath));
});
