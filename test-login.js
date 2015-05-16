'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var appUrl = 'http://mrgamer.github.io/angular-login-example';
//var appUrl = 'http://localhost:8080';

feature('Login', function() {

  beforeFeature(function() {
    browser.driver.manage().window().setSize(1100, 650);
  });

  var dataset = [
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
