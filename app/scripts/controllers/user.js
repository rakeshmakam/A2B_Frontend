'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
	.controller('UserCtrl', function ($scope, UserService, $location) {
		// if (localStorage.getItem('AtoB')) {
		// 	$location.path('/userprofile');
		// } else {
		// 	$location.path('/');
		// }

		$scope.getUrlParams = function (url) {
			var params = {};
			(url + '?').split('?')[1].split('&').forEach(function (pair) {
			pair = (pair + '=').split('=').map(decodeURIComponent);
				if (pair[0].length) {
					params[pair[0]] = pair[1];
				}
			});
			return params;
		},


		$scope.params = $scope.getUrlParams(location.href);

		if(!$.isEmptyObject($scope.params)) {
			$scope.user = {
				fullName: $scope.params.vendor_user_name,
				phoneNumber: $scope.params.vendor_user_phone_number,
				email: $scope.params.vendor_user_email,
				addressLine1: $scope.params.vendor_user_address,
				city: $scope.params.vendor_user_city,
				pinCode: $scope.params.vendor_user_pincode
			}
		}

	 //    $('#login-form-link').click(function(e) {
	 // 		$("#register-form").fadeOut(100);		
		// });

		// $('#register-form-link').click(function(e) {
		// 	$("#login-form").fadeOut(100);
		// 	$('#login-form-link').text('Register');
		// 	$("#register-form").delay(100).fadeIn(100);
		// 	$('#login-form-link').unbind("click");	
		// });

		// $('#login-form-lin').click(function(e) {
		// 	$("#login-form").delay(100).fadeIn(100);
		// 	$("#register-form").fadeOut(100);
		// 	$('#login-form-link').text('Login');
		// 	$('#register-form')[0].reset();
	 // 	});

		// $("login-submit").on('click', function(){
		//     $(this).siblings().removeClass('active');
		//     $(this).addClass('active');
		// });

		$scope.registerUser = function(){
			$scope.registerButton = true;
			UserService.register($scope.user)
			.then(function (response) {	
				localStorage.setItem('AtoB',  JSON.stringify(response));
				$location.path('/userprofile');
			})
			.catch(function (err) {
				$scope.error = err.message;
				$scope.registerButton = false;
			})
		}

		$scope.login = function(){
			console.log($scope.userData);
			$scope.loginButton = true;
			UserService.login($scope.userData)
			.then(function(response){
				$scope.serverMessage = '';
				localStorage.setItem('AtoB',  JSON.stringify(response));
				$location.path('/userprofile');
			})
			.catch(function(err){
				$scope.error = err.message;
				$scope.loginButton = false;
				// $location.path('/');
			});
		}
	});