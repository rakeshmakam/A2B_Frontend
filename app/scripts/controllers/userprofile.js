'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserProfileCtrl', function ($scope, $rootScope, $cookieStore, UserService, $location, PaymentService,$cookies) {

    $rootScope.user = $cookies.get('AtoB').user;
    // $scope.authToken = $rootScope.user.token;
    console.log($rootScope.user);
	$scope.logout = function () {
		UserService.logout($scope.authToken)
		.then(function (response) {
			$location.path('/')
			console.log('mmmmmmmmmmmm',User);
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
	console.log("----------------> merchantId",$scope.params)
	$scope.userAuthorizationData = {
		merchantId: Base64.decode($scope.params.merchant_id),
		amount: $scope.params.amount,
		currency: $scope.params.currency
	};
	$scope.payButton = false;
	PaymentService.userAuthorization($scope.authToken, $scope.userAuthorizationData)
	.then(function (response) {
		console.log(response);
				// functionality of button
			$scope.payButton = true;	
	})
	.catch(function (err) {
		console.log(err);
		$scope.payButton = false;

	});

	$scope.pay = function () {
		console.log("data fun call")
		var data = {
			merchant_id : Base64.decode($scope.params.merchant_id),
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
		console.log('----------->',data)
		// var merchant = { "_id" : "561cd859e4b0eda81a924ff8", "_class" : "com.mantralabsglobal.addtobill.model.Merchant", "merchantName" : "Flipkart", "chargesEnabled" : "true", "supportedCurrencies" : [  "usd",  "inr" ], "defaultCurrency" : "inr", "email" : "support@flipkartbeta.com", "transfersEnabled" : false }
		var merchantData = Base64.encode(Base64.decode($scope.params.merchant_id)+':'+Base64.decode($scope.params.merchant_secret));
		// var merchantData = Base64.encode(merchant);
		PaymentService.pay(merchantData, data)
		.then(function (response) {
			console.log(response);
		})
		.catch(function (err) {
			console.log(err);
		});
	}



	$scope.closeWindow = function() {
		$cookies.remove("AtoB");
		window.close();		
	}

	




	

});
