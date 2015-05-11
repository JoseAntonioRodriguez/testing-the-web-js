'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var server = require('./server');
promisize(server);

//var appUrl = 'http://mrgamer.github.io/angular-login-example';
var appUrl = 'http://localhost:8080';

var dataset;

beforeAll(function() {
  this.timeout(15000);
  browser.driver.manage().window().maximize();
  server.start();
});

feature('Login', function() {
  dataset = [
    {desc: 'role user', username: 'johnm', password: 'hello', name: 'John'},
    {desc: 'role admin', username: 'sandrab', password: 'world', name: 'Sandra'}
  ];
  scenario('Correct log in', dataset, function(variant) {
    beforeEachVariant(function() {
      browser.get(appUrl);
    });

    given('I am logged out', function() {
      var logoutBtn = element(by.buttonText('Logout'));
      logoutBtn.isDisplayed().then(function(isVisible) {
        if (isVisible) {
          logoutBtn.click();
        }
      });
    });
    when('I enter in the login form the credentials of a user with ' + variant.desc, function() {
      var usernameInput = element(by.model('login.username'));
      var passwordInput = element(by.model('login.password'));
      usernameInput.clear();
      usernameInput.sendKeys(variant.username);
      passwordInput.clear();
      passwordInput.sendKeys(variant.password);
    });
    and('I click on the "Login" button', function() {
      element(by.buttonText('Login')).click();
    });
    then('The app greets the user using her real name', function() {
      expect(element(by.exactBinding('ls.user.name')).getText()).to.eventually.equal('Hello ' + variant.name);
    });
    and('the "Logout" button is shown', function() {
      expect(element(by.buttonText('Logout')).isDisplayed()).to.eventually.be.true;
    });
  });
});


var LoginForm = function LoginForm() {
  this.usernameInput = element(by.model('login.username'));
  this.passwordInput = element(by.model('login.password'));
  this.loginBtn = element(by.buttonText('Login'));
  this.logoutBtn = element(by.buttonText('Logout'));

  this.login = function login(username, password) {
    this.usernameInput.clear();
    this.usernameInput.sendKeys(username);
    this.passwordInput.clear();
    this.passwordInput.sendKeys(password);
    this.loginBtn.click();
  };

  this.logout = function logout() {
    var self = this;
    self.logoutBtn.isDisplayed().then(function(isVisible) {
      if (isVisible) {
        self.logoutBtn.click();
      }
    });
  };
};

feature("Access control based on user's role", function() {
  dataset = [
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
});

afterAll(function() {
  server.stop();
});
