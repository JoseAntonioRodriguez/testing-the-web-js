'use strict';

var fork = require('child_process').fork;

var gruntPath = './node_modules/.bin/grunt';
var angularLoginExamplePath = '../angular-login-example';

var serverPid;

module.exports = {
  start: function startServer(cb) {
    var process = fork(gruntPath, {cwd: angularLoginExamplePath, silent: true});
    process.stdout.on('data', function(chunk) {
      if (chunk.toString().indexOf(' - Waiting...') !== -1) {
        process.stdout.removeAllListeners();
        serverPid = process.pid;
        cb();
      }
    });
  },
  stop: function stopServer(cb) {
    process.kill(serverPid);
    cb();
  }
};
