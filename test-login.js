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

  scenario('Correct log in', function() {
    beforeScenario(function() {
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
    when('I enter in the login form the credentials of a user with role user', function() {
      var usernameInput = element(by.model('login.username'));
      var passwordInput = element(by.model('login.password'));
      usernameInput.clear();
      usernameInput.sendKeys('johnm');
      passwordInput.clear();
      passwordInput.sendKeys('hello');
    });
    and('I click on the "Login" button', function() {
      element(by.buttonText('Login')).click();
    });
    then('The app greets the user using her real name', function() {
      expect(element(by.exactBinding('ls.user.name')).getText()).to.eventually.equal('Hello John');
    });
    and('the "Logout" button is shown', function() {
      expect(element(by.buttonText('Logout')).isDisplayed()).to.eventually.be.true;
    });
  });

});
