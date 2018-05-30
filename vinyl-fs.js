var map = require('map-stream');
var vfs = require('vinyl-fs');

var log = function(file, cb) {
  console.log(file.path);
  cb(null, file);
}

vfs.src(['./js/**/*.js']) //  .src 接口可以匹配一个通配符，将匹配到的文件转为 Vinyl Stream
  .pipe(map(log))
  .pipe(vfs.dest('./output', { sourcemaps: true })); // .dest 接口又能消费这个 Stream，并生成对应文件。