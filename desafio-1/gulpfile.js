/**
 * Author: Huriel Lopes
 * Data de Desenvolvimento: 18/05/2019
 * Desafio de processo seletivo para vaga de programadro junior
 */

// Variaveis Globais
var gulp                = require('gulp');
var browserSync         = require('browser-sync').create();
var sass                = require('gulp-sass');
var htmlmin             = require('gulp-htmlmin');
var concat              = require('gulp-concat');
var minify              = require('gulp-minify');
var cleanCss            = require('gulp-clean-css');

// Minifica o html
gulp.task('htmlminifica', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest(''));
});

// Mover o bootstrap para pasta assets/css pra raiz do projeto
gulp.task('css', function () {
    return gulp.src(['src/assets/css/bootstrap.min.css'])
               .pipe(gulp.dest("assets/css"))
               .pipe(browserSync.stream());
});

// Mover JS para src/js
gulp.task('js', function () {

    return gulp.src(['src/assets/js/bootstrap.min.js', 'src/assets/js/jquery.min.js', 'src/assets/js/popper.min.js'])
        .pipe(gulp.dest("assets/js"))
        .pipe(browserSync.stream());

});

// Servidor para compilar HTML/SCSS
gulp.task('serve', function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/assets/css/*.css").on("change", browserSync.reload);
    gulp.watch("src/*.html").on("change", browserSync.reload);

});

// Padrão que irá executar
gulp.task('default', ['js', 'css', 'serve','htmlminifica']);
