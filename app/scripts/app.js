'use strict';

/**
 * @ngdoc overview
 * @name a2BClientApp
 * @description
 * # a2BClientApp
 *
 * Main module of the application.
 */
angular
  .module('a2BClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    var resolve = {
        auth: function ($location) {
          if (localStorage.getItem('AtoB')) {
            return true;
          } else {
            return false;
          }   
        }
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'UserCtrl'
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'UserProfileCtrl'
      })
      .when('/forgotPassword', {
        templateUrl: 'views/forgotPassword.html',
      })
      .when('/decline',{
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
