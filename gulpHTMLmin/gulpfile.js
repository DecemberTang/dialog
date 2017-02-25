var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-clean-css'),
    jsmin = require('gulp-minify');


gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
gulp.task('default',function(){
    console.log('gulp default');
});
gulp.task('minicss', function () {
    gulp.src('css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./mincss'));
});
gulp.task('minjs',function(){
    gulp.src('js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('minjs'));
});