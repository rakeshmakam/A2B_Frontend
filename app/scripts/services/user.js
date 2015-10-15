angular.module('a2BClientApp')
  .service('UserService', function ($q, $http, $resource,$rootScope, $cookieStore) {
  	var baseUrl = 'http://localhost:8000';

    this.userDetails = function(){
      var deferred = $q.defer();
      var UserProfile = $cookieStore.get('User');
      $rootScope.user = UserProfile.user;
      var headers = { 'Authorization': $rootScope.user.token };
      $http.get(baseUrl+'/user')
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
  		$http.post(baseUrl+'/user/signup',user)
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
  		$http.post(baseUrl+'/user/login',data)
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
      $http.get(baseUrl+'/user/logout',{ headers: headers })
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
      $http.delete(baseUrl+'/user/id',id)
      .success(function(response){
        
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      })

      return deferred.promise;
    }


  });