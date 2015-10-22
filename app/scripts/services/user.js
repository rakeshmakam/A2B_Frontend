angular.module('a2BClientApp')
  .service('UserService', function ($q, $http, $rootScope) {
  	var baseUrl = window.location.origin;

    this.userDetails = function(){
      var deferred = $q.defer();
      var UserProfile = JSON.parse($cookies.get('AtoB')).user;
      $rootScope.user = UserProfile.user;
      var headers = { 'Authorization': $rootScope.user.token };
      $http.get(baseUrl+'/api/user')
      .success(function(response){
        $rootScope.user=response;
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }


  	this.register = function(user){
  		var deferred = $q.defer();
  		$http.post(baseUrl+'/api/user/signup',user)
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
      console.log(baseUrl+'/api/user/login');
  		$http.post(baseUrl+'/api/user/login',data)
  		.success(function(response){
  			$rootScope.user = response;
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
      $http.get(baseUrl+'/api/user/logout',{ headers: headers })
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
      $http.delete(baseUrl+'/api/user/id',id)
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
      $http.post(baseUrl+'/api/user/exists', data, {headers: { 'Authorization': 'Bearer '+ authToken }})
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }
  });