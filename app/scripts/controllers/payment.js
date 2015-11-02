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
  		$scope.payButton = true;
	 //  	if (localStorage.getItem('AtoB')) {
		// 	$location.path('/payment');
		// } else {
		// 	$location.path('/');
		// }
			
	    // $scope.userToken = JSON.parse(localStorage.getItem('AtoB')).token;
	    // console.log($scope.userToken);
		// $scope.logout = function () {
		// 	UserService.logout($scope.userToken)
		// 	.then(function (response) {
		// 		$location.path('/')
		// 		localStorage.removeItem('AtoB')
		// 	}).catch(function (err) {	
		// 		$scope.error = err;
		// 	})
		// },

		var getUrlParams = function (url) {
			var params = {};
			(url + '?').split('?')[1].split('&').forEach(function (pair) {
			pair = (pair + '=').split('=').map(decodeURIComponent);
				if (pair[0].length) {
					params[pair[0]] = pair[1];
				}
			});
			return params;
		};

		$scope.params = getUrlParams(location.href);
		console.log($scope.params);
		if ($scope.params && !$scope.params.payload) {
			$location.path('/')
		} else {
			$scope.merchantData = Base64.encode(Base64.decode($scope.params.merchant_id)+':'+Base64.decode($scope.params.merchant_secret));
			Authorization();
		}
		
		// $scope.userAuthorizationData = {
		// 	merchantId: Base64.decode($scope.params.merchant_id),
		// 	amount: $scope.params.amount,
		// 	currency: $scope.params.currency
		// };

		

		// UserService.existMerchant($scope.userToken, {merchantId: Base64.decode($scope.params.merchant_id), vendorUserId: $scope.params.vendor_user_id})
		// .then(function (res) {
		// 	PaymentService.userAuthorization($scope.userToken, $scope.userAuthorizationData)
		// 	.then(function (response) {
		// 		console.log(response.userToken);
		// 		$scope.AuthToken = response.userToken;
		// 		$scope.payButton = false;	
		// 	}).catch(function (error) {
		// 		$scope.payButton = true;
		// 	});	
		// }).catch(function (err) {
		// 	$scope.payButton = true;
		// });
		
		function Authorization () {
			console.log($scope.params);
			var userAuthorizationData = {
				merchantId: Base64.decode($scope.params.merchant_id),
				amount: $scope.params.amount,
				currency: $scope.params.currency
			};
			var autoLoginData = {
				"email": $scope.params.vendor_user_email,
				"phoneNumber": $scope.params.vendor_user_phone_number,
				"billingAddress" : {
					"street": $scope.params.vendor_user_address,
					"city": $scope.params.vendor_user_city,
					"postalCode": $scope.params.vendor_user_pincode,
					"state": $scope.params.vendor_user_state
				},
				payload: $scope.params.payload

			}
			console.log(autoLoginData);
			UserService.autoLogin(autoLoginData, $scope.merchantData)
			.then(function (resp) {
				console.log(resp);
			})
			.catch(function (e) {
				console.log(e);
			})
			UserService.existMerchant($scope.userToken, {merchantId: Base64.decode($scope.params.merchant_id), vendorUserId: $scope.params.vendor_user_id})
			.then(function (res) {
				PaymentService.userAuthorization($scope.userToken, userAuthorizationData)
				.then(function (response) {
					console.log(response.userToken);
					$scope.AuthToken = response.userToken;
					$scope.payButton = false;	
				})
				.catch(function (error) {
					$scope.payButton = true;
				});	
			})
			.catch(function (err) {
				$scope.payButton = true;
			});
		}
		

		$scope.pay = function () {
			var data = {
				statement_descriptor: $scope.params.statement_descriptor,
				description: $scope.params.description,
				user_token: $scope.AuthToken
			}
			$scope.payButtonImage = true;
			PaymentService.pay($scope.merchantData, data).then(function (response) {
				window.parent.location = $scope.params.redirect_url+"?charge_id="+response.paymentResponse.chargeId;
				// window.parent.closePopup(response.paymentResponse.chargeId);
			}).catch(function (err) {
				console.log(err);
				$scope.payButtonImage = false;
			});
		}
		
		$scope.closeWindow = function() {
			window.parent.location = "http://atob.zolome.com/"
			// window.parent.closePopup();	
		}
	});
