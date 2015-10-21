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

        auth: function ($location,$cookies) {

            if ($cookies.get('User')) {
            var user=$cookies.get('User')
            
            return user;

        } 
        else {
            $location.path('/');
        }   
      }
  };



  

 


    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl',
        
       


       
      })
       .when('/userprofile', {
      templateUrl: 'views/userProfile.html',
      controller: 'UserProfileCtrl',
      resolve : resolve
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
