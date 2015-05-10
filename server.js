'use strict';

var fork = require('child_process').fork;

var serverPid;

module.exports = {
  start: function startServer(cb) {
    var process = fork('./node_modules/.bin/grunt', {cwd: '../angular-login-example', silent: true});
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
