
var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


const sass_files = './src/**/*.scss'
const sass_output_styles_folder = './dist/sass_output_styles/'

const sass_output_styles = [
    'compact',
    'compressed',
    'expanded',
    'nested'
]


function cb_for_sass_output_task(output_style = 'nested') {

    return function () {
        return gulp.src(sass_files)
            .pipe(sass({ outputStyle: output_style }).on('error', sass.logError))
            .pipe(concat('sass_' + output_style + '.css'))
            .pipe(gulp.dest(sass_output_styles_folder));
    }
}

for (let style of sass_output_styles) {
    let task_name = 'sass_' + style;
    gulp.task(task_name, [], cb_for_sass_output_task(style));
}

gulp.task('default', ['sass2css']);

gulp.task('clear_dist_folder', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('sass2css', ['all_output_styles'], function () {
    return gulp.src(sass_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});


gulp.task('all_output_styles',
    sass_output_styles.map(function (value) {
        return 'sass_' + value;
    })
)

gulp.task('watch_sass', function () {
    gulp.watch(sass_files, ['sass2css']);
});

