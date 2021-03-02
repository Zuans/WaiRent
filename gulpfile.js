const {
    src,
    dest,
    watch,
    series
} = require('gulp');
const sass = require('gulp-sass');
const postcss  = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

function scssTask() {
    return src('app/assets/scss/**/*.scss',{sourcemaps : true })
                .pipe(sass())
                .pipe(postcss([cssnano()]))
                .pipe(dest('server/public/assets/css', { sourcemaps : '.'}));
}

function jsTask() {
    return src('app/assets/js/*.js',{ sourcemaps : true })
                .pipe(terser())
                .pipe(dest('server/public/assets/js',{ sourcemaps : '.' }));
}

function browsersyncServe(cb) {
    browsersync.init({
        server : {
            baseDir : '.',
        },
    });
    cb();
}

function viewsCopy() {
    return src('app/views/**/*.pug',{ sourcemaps : true })
        .pipe(dest(('server/public/views')));
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb(); 
}


function watchTask() {
    watch('app/views/**/*.pug',series(viewsCopy,browsersyncReload));
    watch(['app/assets/**/*.scss','app/assets/**/*.js'],series(viewsCopy,scssTask,jsTask,browsersyncReload));
}



exports.default = series(
    scssTask,
    jsTask,
    viewsCopy,
    browsersyncServe,
    browsersyncReload,
    watchTask
)