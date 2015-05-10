exports.config = {
  directConnect: true,
  specs: ['angular-login-example.js'],
  capabilities: {
    browserName: 'chrome'
    //browserName: 'firefox'
  },
  framework: 'tartare',
  tartareOpts: {
    reporter: 'gherkin',
    timeout: 10000
  }

};