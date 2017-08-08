var gulp = require('gulp');
var sass = require('gulp-sass');


//Compiling sass to css
gulp.task('sass', function () {
	gulp.src('assets/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('assets/css/'));
})

//Watch task
gulp.task('watch', function () {
	gulp.watch('assets/sass/*.scss', ['sass']);
})

//Default task
gulp.task('default', ['sass', 'watch']);