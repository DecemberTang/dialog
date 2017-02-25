var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('default',['testless'], function() {
  // place code for your default task here
  console.log('hello gulp');
});

gulp.task('testless',function(){
    gulp.src('less/index.less')
        .pipe(less())
        .pipe(gulp.dest('css'));
});