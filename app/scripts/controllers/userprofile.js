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

    $rootScope.user = $cookieStore.get('User').user;
    $scope.authToken = $rootScope.user.token;

	$scope.logout = function () {
		UserService.logout($scope.authToken)
		.then(function (response) {
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

	$scope.userAuthorizationData = {
		merchantId: Base64.decode($scope.params.merchant_id),
		amount: $scope.params.amount,
		currency: $scope.params.currency
	};

	PaymentService.userAuthorization($scope.authToken, $scope.userAuthorizationData)
	.then(function (response) {
		console.log(response);
	})
	.catch(function (err) {
		console.log(err);
	});

	$scope.pay = function () {
		var data = {
			currency: $scope.params.currency,
			amount: $scope.params.amount,
			description: $scope.params.description,
			metadata: $scope.params.metadata,
			recipt_email: $scope.params.recipt_email,
			recipt_number: $scope.params.recipt_number,
			shipping_info: $scope.params.shipping_info,
			statement_descriptor: $scope.params.statement_descriptor,
			status: $scope.params.status,
			merchant_transaction_id: $scope.params.merchant_transaction_id
		}
		
		PaymentService.pay($scope.authToken, data)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (err) {
			console.log(err);
		});
	}
});
