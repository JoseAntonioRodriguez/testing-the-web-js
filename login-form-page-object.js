'use strict';

module.exports = function LoginForm() {
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
