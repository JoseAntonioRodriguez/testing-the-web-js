exports.config = {
  directConnect: true,
  capabilities: {
    browserName: 'chrome'
    //browserName: 'firefox'
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