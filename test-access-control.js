'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var LoginForm = require('./login-form-page-object');
var server = require('./server');
promisize(server);

//var appUrl = 'http://mrgamer.github.io/angular-login-example';
var appUrl = 'http://localhost:8080';

feature("Access control based on user's role", function() {

  beforeFeature(function() {
    browser.driver.manage().window().setSize(1100, 650);
    server.start();
  });

  var dataset = [
    {desc: 'role user', username: 'johnm', password: 'hello', authorized: false},
    {desc: 'role admin', username: 'sandrab', password: 'world', authorized: true}
  ];
  scenario('Accessing to restricted pages', dataset, function(variant) {
    var loginForm = new LoginForm();

    beforeEachVariant(function() {
      browser.get(appUrl);
      loginForm.logout();
    });

    given('I am logged in as a user with ' + variant.desc, function() {
      loginForm.login(variant.username, variant.password);
    });
    when('I try to access to the Admin-Only page', function() {
      element(by.cssContainingText('a', 'Admin-Only page')).click();
    });
    then('The app shows ' + (variant.authorized ? 'the page content' : 'an authorization error'), function() {
      var panel = $('ui-view>ui-view>div');
      if (variant.authorized) {
        expect(panel.$('h1').getText()).to.eventually.equal('Admin interface');
        expect(panel.$('div>p').getText()).to.eventually.equal('Only accessible by admins');
      } else {
        expect(panel.$('h1').getText()).to.eventually.equal('Error');
        expect(panel.$('div>p').getText()).to.eventually.equal('You are not authorized');
      }
    })
  });

  afterFeature(function() {
    server.stop();
  });

});
