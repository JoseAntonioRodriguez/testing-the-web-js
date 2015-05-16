exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path
  },
  framework: 'tartare',
  tartareOpts: {
    reporter: 'gherkin',
    timeout: 15000
  },
  suites: {
    login: 'test-login.js',
    acl: 'test-access-control.js'
  }
};
