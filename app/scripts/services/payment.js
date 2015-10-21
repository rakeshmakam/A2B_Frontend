angular.module('a2BClientApp')
	.service('PaymentService', function ($q, $http, $resource,$rootScope, $cookieStore) {
		var baseUrl = window.location.origin;

		this.userAuthorization = function (authToken, data) {
			var deferred = $q.defer();

			$http.post(baseUrl+'/api/user/authorizeUser', data, {headers:{ 'Authorization': 'Bearer '+ authToken }})
				.success(function (response) {
					deferred.resolve(response);
				})
				.error(function (err) {
					deferred.reject(err);
				})

			return deferred.promise;
		}

		this.pay = function (merchantData, data){
			var deferred = $q.defer();
			console.log('merchantData',merchantData);
			// $http.post(baseUrl+'/user/makePayment', data, {headers:{ 'Authorization': 'Bearer '+ authToken }})
			$http.post(baseUrl+'/api/user/makePayment', data, {headers:{ 'Authorization': 'Basic '+  merchantData}})
				.success(function (response) {
					deferred.resolve(response);
				})
				.error(function (err) {
					deferred.reject(err);
				})

			return deferred.promise;
		}
	});
