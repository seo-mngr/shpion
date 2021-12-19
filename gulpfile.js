let { src, dest }         = require('gulp'),
  gulp                    = require('gulp'),
  browsersync             = require('browser-sync').create(),
  fileInclude             = require('gulp-file-include'),
  del                     = require('del'),
  sass                    = require('gulp-sass')(require('sass')),
  postcss                 = require('gulp-postcss'),
  autoprefixer            = require('autoprefixer'),
  sortMediaQueries        = require('postcss-sort-media-queries'),
  rename                  = require('gulp-rename'),
  cssnano                 = require('cssnano'),
  //imagemin                = require('gulp-imagemin'),
  smartGrid               = require('smart-grid'),
  pathModule              = require('path');

let project_folder        = "dist";
let source_folder         = "#src";
let grid_opt_path         = "./" + source_folder + "/js_modules/smartgrid/smartgrid.js";


let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    scss: source_folder + "/scss/style.{sass,scss}",
    scss_parts: source_folder + "/scss/parts/",
    js: source_folder + "/js/scripts.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.{ttf,woff,woff2,otf,svg}",
  },
  watch: {
    html: source_folder + "/**/*.html",
    scss: source_folder + "/scss/**/*.{sass,scss}",
    js: source_folder + "/js/**/*.js",
    js_modules: {
      grid: source_folder + "/js_modules/smartgrid/*.js",
    },
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
}

let build = gulp.series(cleanDist, gulp.parallel(js, grid, css, html, img, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function grid(done){
   delete require.cache[pathModule.resolve(grid_opt_path)];
   let options = require(grid_opt_path);
   smartGrid(path.src.scss_parts, options);
   done();
}

function css() {
  let plugins = [
    autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: true,
    }),
    sortMediaQueries({
      sort: "desktop-first",
    }),
  ];
  return src(path.src.scss)
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest(path.build.css))
    .pipe(postcss([
      cssnano({
        preset: "default",
      }),
    ]))
    .pipe(rename({
      extname: ".min.css",
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function img() {
  return src(path.src.img)
    /*
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
      })
    )
    */
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.js_modules.grid], grid);
  gulp.watch([path.watch.img], img);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.scss], css);
}

function cleanDist() {
  return del(path.clean);
}