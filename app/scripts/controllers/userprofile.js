'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserProfileCtrl', function ($scope, $rootScope, UserService, $location, PaymentService, $cookies) {
  	if ($cookies.get('AtoB')) {
		$location.path('/userprofile');
	} else {
		$location.path('/');
	}
		
    $rootScope.user = JSON.parse($cookies.get('AtoB')).user;

	$scope.logout = function () {
		UserService.logout($rootScope.user.token)
		.then(function (response) {
			$location.path('/')
			$cookies.remove("AtoB");
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
	$scope.userAuthorizationData = {
		merchantId: Base64.decode($scope.params.merchant_id),
		amount: $scope.params.amount,
		currency: $scope.params.currency
	};

	$scope.payButton = true;

	UserService.existMerchant($rootScope.user.token, {merchantId: Base64.decode($scope.params.merchant_id), vendorUserId: $scope.params.vendor_user_id})
	.then(function (res) {
		PaymentService.userAuthorization($rootScope.user.token, $scope.userAuthorizationData)
		.then(function (response) {
			console.log(response.userToken);
			$scope.AuthToken = response.userToken;
			$scope.payButton = false;	
		}).catch(function (error) {
			$scope.payButton = true;
		});	
	}).catch(function (err) {
		$scope.payButton = true;
	});

	$scope.pay = function () {
		var data = {
			statement_descriptor: $scope.params.statement_descriptor,
			description: $scope.params.description,
			user_token: $scope.AuthToken
		}
		var merchantData = Base64.encode(Base64.decode($scope.params.merchant_id)+':'+Base64.decode($scope.params.merchant_secret));

		PaymentService.pay(merchantData, data).then(function (response) {
			console.log(response);
			window.parent.closePopup(response.paymentResponse.chargeId);
		}).catch(function (err) {
			console.log(err);
		});
	}
	
	$scope.closeWindow = function() {
		window.parent.closePopup();	
	}
});
