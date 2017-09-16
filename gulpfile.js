let gulp = require('gulp'),
    less = require("gulp-less"),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload');

gulp.task('less', function () {
    gulp.src('public/style/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
gulp.task('jade', function () {
    gulp.src('index.jade')
      .pipe(jade())
      .pipe(gulp.dest('./'))
      .pipe(livereload())
});

gulp.task('default', ['compile-less','render-jade'],()=>{
    console.log('gulp succuss')
})

gulp.task('watch', function() {
  livereload.listen(); //要在这里调用listen()方法
  gulp.watch('public/style/*.less', ['less']);
  gulp.watch('index.jade', ['jade']);

});