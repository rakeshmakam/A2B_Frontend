angular.module('a2BClientApp')
	.service('PaymentService', function ($q, $http, $resource,$rootScope, $cookieStore) {
		var baseUrl = 'http://localhost:1337';
		this.userAuthorization = function (authToken, data) {
			var deferred = $q.defer();

			$http.post(baseUrl+'/user/authorizeUser', data, {headers:{ 'Authorization': 'Bearer '+ authToken }})
				.success(function (response) {
					deferred.resolve(response);
				})
				.error(function (err) {
					deferred.reject(err);
				})

			return deferred.promise;
		}

		this.pay = function (authToken, data){
			var deferred = $q.defer();

			$http.post(baseUrl+'/user/makePayment', data, {headers:{ 'Authorization': 'Bearer '+ authToken }})
				.success(function (response) {
					deferred.resolve(response);
				})
				.error(function (err) {
					deferred.reject(err);
				})

			return deferred.promise;
		}
	});
