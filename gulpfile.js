const gulp = require('gulp');
const assetpaths = require('gulp-assetpaths');
const Path = require('path');
const chalk = require('chalk');
const server = require('gulp-server-livereload');

// 环境变量
const env = process.env.NODE_ENV || 'production';
const outPaths = {
  develop: './local',
  production: './'
}

// html文件资源引用地址替换
gulp.task('html', () => {
  return gulp.src(['./src/index.html', './src/doc.html'])
    .pipe(assetpaths({
      newDomain: env === 'develop' ? '.' : 'https://aoxiaoqiang.github.io/reg',
      oldDomain : 'https://aoxiaoqiang.github.io/reg',
      docRoot : 'public_html',
      filetypes : ['js','css','ico'],
      customAttributes: ['data-custom'],
      templates: true
     }))
     .pipe(gulp.dest(outPaths[env]));
});

// 移动其他资源文件
gulp.task('resouces', () => {
  return gulp.src(['./src/**/*', '!./src/index.html', '!./src/doc.html'])
    .pipe(gulp.dest(outPaths[env]));
})


// develop watch
gulp.task('watch', () => {
  const watcher = gulp.watch(['./src/*.html', './src/*/*.css', './src/*/*.js']);
  let tempRelativePath = '', targetPath = '';
  watcher.on('change', function(event) {
    tempRelativePath = Path.relative('./', event.path);
    targetPath = Path.dirname(tempRelativePath).replace('src', 'local');
    gulp.src(tempRelativePath)
      .pipe(gulp.dest(targetPath));
    // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    console.log(chalk.green(`File changed: ${tempRelativePath} -> ${targetPath}/${Path.basename(tempRelativePath)}`));
  });
})

gulp.task('webserver', function() {
  gulp.src('./local')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['html', 'resouces']);
gulp.task('watchdev', ['watch', 'default', 'webserver']);