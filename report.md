

|   | Passed | Failed | TOTAL | Manual |
|---|-------:|-------:|------:|-------:|
| Features (US) | 2 | 0 | 2 | 0 | 
| Scenarios (TC) | 2 | 0 | 2 | 0 | 
| Variants (DS) | 4 | 0 | 4 | 0 | 
| Steps |  |  | 16 | 0 | 

# TOC
- [Feature: Access control based on user's role](#feature-access-control-based-on-users-role)
  - [Scenario: Accessing to restricted pages](#feature-access-control-based-on-users-role-scenario-accessing-to-restricted-pages)
- [Feature: Login](#feature-login)
  - [Scenario: Correct log in](#feature-login-scenario-correct-log-in)

---
<a name="feature-access-control-based-on-users-role"></a>
## Feature: Access control based on user's role

<a name="feature-access-control-based-on-users-role-scenario-accessing-to-restricted-pages"></a>
### Scenario: Accessing to restricted pages
<a name="feature-access-control-based-on-users-role-scenario-accessing-to-restricted-pages-variant-1-role-user"></a>
**Variant #1: role user**
<pre><code><b>Given:</b> I am logged in as a user with role user
<b> When:</b> I try to access to the Admin-Only page
<b> Then:</b> The app shows an authorization error</code></pre>

<a name="feature-access-control-based-on-users-role-scenario-accessing-to-restricted-pages-variant-2-role-admin"></a>
**Variant #2: role admin**
<pre><code><b>Given:</b> I am logged in as a user with role admin
<b> When:</b> I try to access to the Admin-Only page
<b> Then:</b> The app shows the page content</code></pre>

---
<a name="feature-login"></a>
## Feature: Login

<a name="feature-login-scenario-correct-log-in"></a>
### Scenario: Correct log in
<a name="feature-login-scenario-correct-log-in-variant-1-role-user"></a>
**Variant #1: role user**
<pre><code><b>Given:</b> I am logged out
<b> When:</b> I enter in the login form the credentials of a user with role user
<b>  And:</b> I click on the "Login" button
<b> Then:</b> The app greets the user using her real name
<b>  And:</b> the "Logout" button is shown</code></pre>

<a name="feature-login-scenario-correct-log-in-variant-2-role-admin"></a>
**Variant #2: role admin**
<pre><code><b>Given:</b> I am logged out
<b> When:</b> I enter in the login form the credentials of a user with role admin
<b>  And:</b> I click on the "Login" button
<b> Then:</b> The app greets the user using her real name
<b>  And:</b> the "Logout" button is shown</code></pre>

---

