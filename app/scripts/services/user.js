angular.module('a2BClientApp')
  .service('UserService', ['$q', '$http', function ($q, $http) {
  	var baseUrl = window.location.origin;

    // this.userDetails = function(){
    //   var deferred = $q.defer();
    //   var headers = { 'Authorization': };
    //   $http.get(baseUrl+'/api/v1/user')
    //   .success(function(response){
    //     deferred.resolve(response);
    //   })
    //   .error(function(err){
    //     deferred.reject(err);
    //   })

    //   return deferred.promise;
    // }


  	this.register = function(user){
  		var deferred = $q.defer();
  		$http.post(baseUrl+'/api/v1/user/signup',user)
  		.success(function(response){
        
  			deferred.resolve(response);
  		})
  		.error(function(err){
  			deferred.reject(err);
  		})

  		return deferred.promise;
  	}


  	this.login = function(data){
  		var deferred = $q.defer();
  		$http.post(baseUrl+'/api/v1/user/login',data)
  		.success(function(response){
  			deferred.resolve(response);
  		})
  		.error(function(err){
  			deferred.reject(err);
  		})

  		return deferred.promise;
  	}

    this.logout = function(authToken){
      var deferred = $q.defer();
      var headers = { 'Authorization': 'Bearer '+ authToken };
      $http.get(baseUrl+'/api/v1/user/logout',{ headers: headers })
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }

    this.delete = function(id){
      var deferred = $q.defer();
      $http.delete(baseUrl+'/api/v1/user/id',id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }

    this.existMerchant = function(authToken, data){
      var deferred = $q.defer();
      $http.post(baseUrl+'/api/v1/user/exists', data, {headers: { 'Authorization': 'Bearer '+ authToken }})
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }
  }]);