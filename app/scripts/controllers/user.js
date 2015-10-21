'use strict';

/**
 * @ngdoc function
 * @name a2BClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the a2BClientApp
 */
angular.module('a2BClientApp')
  .controller('UserCtrl', function ($scope, UserService, $location,$rootScope,$cookies,$cookieStore) {
     

	

// ===============================================================================================
	// if($cookieStore!=null){
	// 	$cookieStore.remove("User");
	// }

	//console.log('=======>',$cookies.get('User'))

	if($cookies.get('User')){
		$location.path('/userprofile')

	}
	else{
		$location.path('/')
	}




	$(function() {

    $('#login-form-link').click(function(e) {

		
 		$("#register-form").fadeOut(100);

 		
		
	});
	$('#register-form-link').click(function(e) {
		console.log('inside');
		$("#login-form").fadeOut(100);
		$('#login-form-link').text('Register');
		$("#register-form").delay(100).fadeIn(100);
		$('#login-form-link').unbind("click");
 	
 		
		
	});
	$('#login-form-lin').click(function(e) {

		 $("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
 		$('#login-form-link').text('Login');
 		 $('#register-form')[0].reset();
 		
 	});

	$("login-submit").on('click', function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active');
})

})




	$scope.registerUser = function(){
		console.log('from register form',$scope.user);
		UserService.register($scope.user)
		.then(function(response){
			console.log('resp',response);
			  		
	   		$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
	 		
			$('#register-form-link').removeClass('active');
		
			$('#login-form-link').addClass('active');
			$('#login-form-link').text('Login');
			$scope.message = "You have Registered Successfully Please verify and Login";
			setTimeout(function() {
  			$("#mydiv").fadeOut();
			}, 3000);
		}).catch(function(err){
			//$scope.error = err;
			console.log('error',err);
			//$scope.error = err.invalidAttributes.email[0].message;
		})
	}

	$scope.login = function(){
		console.log('user',$scope.user);
		UserService.login($scope.user)
		.then(function(response){
			$scope.serverMessage = '';
			console.log('resp',response);
			$location.path('/userprofile');
			var user = response.user;
			var sessionObj = {'user':response};
			// $cookies.get('sessionObj');
			console.log('---',sessionObj);

			$cookies.put('User',sessionObj);

			console.log($cookies.get('User'));
			//console.log('---');

			//$cookieStore.put('User',sessionObj);
			//console.log("--------",cookieStore.get('User'));


		}).catch(function(err){
			//$scope.serverMessage = "Username and Password does not matches"; // for display server msg
			$scope.error = err.message;
			$location.path('/');

			
		})
	}
	//---------------------------------------------------------------------

	
	//---------------------------------------------------------------------

	
	$scope.delete = function(id){
		console.log('from form',id);
		UserService.delete(id)
		.then(function(response){
			console.log('resp',response);
			//$location.path('/login')
			$rootScope.user = response.user;
		}).catch(function(err){
			$scope.error = err;
		})
	}

	

  });




