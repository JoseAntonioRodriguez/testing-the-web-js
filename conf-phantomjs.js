exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['angular-login-example.js'],
  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
  framework: 'tartare',
  tartareOpts: {
    reporter: 'gherkin',
    timeout: 10000
  }
};
