'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserProfileCtrl', function ($scope, $rootScope, $cookieStore, UserService, $location, PaymentService) {
  	console.log('in UserProfileCtrl');
    var UserProfile = $cookieStore.get('User');
    $rootScope.user = UserProfile.user;
    $scope.authToken = $rootScope.user.token;
	$scope.logout = function () {
		console.log('authToken',$scope.authToken);
		UserService.logout($scope.authToken)
		.then(function (response) {
			alert("logged out successful");
			$location.path('/')
			$cookieStore.remove("User");
		}).catch(function (err) {
			$scope.error = err;
		})
	},

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
	
	$scope.decodedParams = {
		merchantId : Base64.decode($scope.params.merchant_id),
		merchantSecret : Base64.decode($scope.params.merchant_secret),
		cartValue : $scope.params.cart_value
	};

	PaymentService.userAuthorization($scope.authToken, $scope.decodedParams)
	.then(function (response) {
		console.log(response);
	})
	.catch(function (err) {
		console.log(err);
	});

	$scope.pay = function () {
		console.log($scope.decodedParams);
		PaymentService.pay($scope.authToken, $scope.decodedParams)
	}
  });
