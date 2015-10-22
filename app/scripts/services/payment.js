angular.module('a2BClientApp')
	.service('PaymentService',['$q', '$http', function ($q, $http) {
		var baseUrl = window.location.origin;

		this.userAuthorization = function (authToken, data) {
			console.log(data);
			console.log(authToken);
			var deferred = $q.defer();

			$http.post(baseUrl+'/api/v1/user/authorize', data, {headers: { 'Authorization': 'Bearer '+ authToken }})
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
			$http.post(baseUrl+'/api/v1/user/payment', data, {headers: { 'Authorization': 'Basic '+  merchantData}})
				.success(function (response) {
					deferred.resolve(response);
				})
				.error(function (err) {
					deferred.reject(err);
				})

			return deferred.promise;
		}
	}]);
