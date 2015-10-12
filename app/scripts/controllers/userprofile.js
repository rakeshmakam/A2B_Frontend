'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserProfileCtrl', function ($scope, $rootScope, $cookieStore, UserService, $location) {
  	console.log('in UserProfileCtrl');
    var UserProfile = $cookieStore.get('User');
    $rootScope.user = UserProfile.user;

	$scope.logout = function(){
		var authToken = $rootScope.user.token;
		console.log('authToken',authToken);
		UserService.logout(authToken)
		.then(function(response){
			alert("logged out successful");
			$location.path('/')
			$cookieStore.remove("User");
		}).catch(function(err){
			$scope.error = err;
		})
	}
  });
