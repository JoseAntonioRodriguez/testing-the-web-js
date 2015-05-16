'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;


//var appUrl = 'http://mrgamer.github.io/angular-login-example';
var appUrl = 'http://localhost:8080';

feature("Access control based on user's role", function() {

  beforeFeature(function() {
    browser.driver.manage().window().setSize(1100, 650);
  });

  var dataset = [
    {desc: 'role user', username: 'johnm', password: 'hello', authorized: false},
    {desc: 'role admin', username: 'sandrab', password: 'world', authorized: true}
  ];
  scenario('Accessing to restricted pages', dataset, function(variant) {

    beforeEachVariant(function() {
      browser.get(appUrl);

    });

    given('I am logged in as a user with ' + variant.desc, function() {

    });
    when('I try to access to the Admin-Only page', function() {

    });
    then('The app shows ' + (variant.authorized ? 'the page content' : 'an authorization error'), function() {

    })
  });

});
