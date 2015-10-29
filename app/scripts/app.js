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
            return localStorage.getItem('AtoB');
          } else {
            $location.path('/');
          }   
        }
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl'
      })
      .when('/userprofile', {
        templateUrl: 'views/userProfile.html',
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
