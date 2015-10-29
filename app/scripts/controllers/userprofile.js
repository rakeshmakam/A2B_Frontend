'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserProfileCtrl', function ($scope, UserService, $location, PaymentService) {
  	if (localStorage.getItem('AtoB')) {
		$location.path('/userprofile');
	} else {
		$location.path('/');
	}
		
    $scope.userToken = JSON.parse(localStorage.getItem('AtoB')).token;
    console.log($scope.userToken);
	$scope.logout = function () {
		UserService.logout($scope.userToken)
		.then(function (response) {
			$location.path('/')
			localStorage.removeItem('AtoB')
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

	UserService.existMerchant($scope.userToken, {merchantId: Base64.decode($scope.params.merchant_id), vendorUserId: $scope.params.vendor_user_id})
	.then(function (res) {
		PaymentService.userAuthorization($scope.userToken, $scope.userAuthorizationData)
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
			console.log($scope.params.redirect_url);
			window.parent.location = $scope.params.redirect_url+"?charge_id="+response.paymentResponse.chargeId;
			// window.parent.closePopup(response.paymentResponse.chargeId);
		}).catch(function (err) {
			console.log(err);
		});
	}
	
	$scope.closeWindow = function() {
		window.parent.location = ""
		// window.parent.closePopup();	
	}
});
