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

  //   var resolve = {
  //     auth: function ($location, UserService){
  //       return UserService.userDetails()
  //       .then(function(user){

  //       })
  //     .catch(function(err){
  //       $location.path('/');
  //     });
  //   }
  // };

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl'
      })
      .when('/userprofile', {

        templateUrl: 'views/userProfile.html',
        controller: 'UserProfileCtrl',
        // resolve : resolve

      })
        .when('/forgotPassword', {

        templateUrl: 'views/forgotPassword.html',
        //controller: 'UserProfileCtrl',
        // resolve : resolve

      })

      // .when('/', {

      //   templateUrl: 'views/login.html',
      //   controller: 'UserLogoutCtrl'

      // })
  



      .otherwise({
        redirectTo: '/'
      });
  });
