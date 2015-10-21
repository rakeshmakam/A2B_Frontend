'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
	.controller('UserCtrl', function ($scope, UserService, $location,$rootScope, $cookies, $cookieStore) {
		if ($cookies.get('AtoB')) {
			$location.path('/userprofile');
		} else {
			$location.path('/');
		}

	    $('#login-form-link').click(function(e) {
	 		$("#register-form").fadeOut(100);		
		});

		$('#register-form-link').click(function(e) {
			$("#login-form").fadeOut(100);
			$('#login-form-link').text('Register');
			$("#register-form").delay(100).fadeIn(100);
			$('#login-form-link').unbind("click");	
		});

		$('#login-form-lin').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
			$("#register-form").fadeOut(100);
			$('#login-form-link').text('Login');
			$('#register-form')[0].reset();
	 	});

		$("login-submit").on('click', function(){
		    $(this).siblings().removeClass('active');
		    $(this).addClass('active');
		});

		$scope.registerUser = function(){
			$scope.registerButton = true;
			UserService.register($scope.user)
			.then(function(response){			  		
		   		$("#login-form").delay(100).fadeIn(100);
		 		$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$('#login-form-link').addClass('active');
				$('#login-form-link').text('Login');
				$scope.message = "You have Registered Successfully Please verify and Login";
				setTimeout(function() {
	  				$("#mydiv").fadeOut();
				}, 3000);
			})
			.catch(function(err){
				$scope.registerButton = false;
			})
		}

		$scope.login = function(){
			$scope.loginButton = true;
			UserService.login($scope.user)
			.then(function(response){
				$scope.serverMessage = '';
				$location.path('/userprofile');
				var user = response.user;
				var sessionObj = {'user': response};
				$cookies.put('AtoB',JSON.stringify({user: response}));
			})
			.catch(function(err){
				$scope.error = err.message;
				$scope.loginButton = false;
				$location.path('/');
			});
		}
		
		$scope.delete = function(id){
			UserService.delete(id)
			.then(function(response){
				$rootScope.user = response.user;
			})
			.catch(function(err){
				$scope.error = err;
			})
		}
	});