var path = require('path');

desc('This is the default task.');
task('default', function (params) {
  console.log('This is the default task.');
});

var buildDir = 'bin';

function compileSkewSources(sources, outputFile, done) {
  jake.exec(
    '$(npm bin)/skewc ' + sources.join(' ') + ' --output-file=' + outputFile + ' --release',
    { printStdout: true },
    done
  );
}

directory('bin');

desc('Build Skew -> Javascript');
task('build', ['bin'], function () {
  var sources = [
    'vectorclock.sk'
  ];

  var outputFile = path.join(buildDir, 'vectorclock.js');
  compileSkewSources(sources, outputFile, complete);
});

desc('Watch skew files and compile when they change');
watchTask(['build'], function () {
  this.watchFiles.include([
    './**/*.sk'
  ]);
});

desc('Run tests');
task('test', ['build'], function () {
  var testFile = path.join(buildDir, 'test.js');

  var sources = [
    'vectorclock.sk',
    'test.sk'
  ];

  var outputFile = path.join(buildDir, 'test.js');
  compileSkewSources(sources, outputFile, function () {
    jake.exec('$(npm bin)/mocha ' + testFile, { printStdout: true }, function () {
      console.log('Done running tests');
      complete();
    });
  });
});

desc('Clean build products');
task('clean', [], function () {


});

