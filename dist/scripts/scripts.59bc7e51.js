"use strict";angular.module("a2BClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){var b={auth:function(a,b){b.get("AtoB")||a.path("/")}};a.when("/",{templateUrl:"views/login.html",controller:"UserCtrl"}).when("/userprofile",{templateUrl:"views/userProfile.html",controller:"UserProfileCtrl",resolve:b}).when("/forgotPassword",{templateUrl:"views/forgotPassword.html"}).when("/decline",{templateUrl:"views/login.html"}).otherwise({redirectTo:"/"})}]),angular.module("a2BClientApp").controller("UserProfileCtrl",["$scope","$rootScope","$cookieStore","UserService","$location","PaymentService","$cookies",function(a,b,c,d,e,f,g){b.user=JSON.parse(g.get("AtoB")).user,console.log(b.user),a.logout=function(){d.logout(b.user.token).then(function(a){e.path("/"),g.remove("AtoB")})["catch"](function(b){a.error=b})},a.getUrlParams=function(a){var b={};return(a+"?").split("?")[1].split("&").forEach(function(a){a=(a+"=").split("=").map(decodeURIComponent),a[0].length&&(b[a[0]]=a[1])}),b},a.params=a.getUrlParams(location.href),a.userAuthorizationData={merchantId:Base64.decode(a.params.merchant_id),amount:a.params.amount,currency:a.params.currency},a.payButton=!1,d.existMerchant(b.user.token,{merchantId:Base64.decode(a.params.merchant_id),vendorUserId:a.params.vendor_user_id}).then(function(c){f.userAuthorization(b.user.token,a.userAuthorizationData).then(function(b){console.log(b.userToken),a.AuthToken=b.userToken,a.payButton=!0})["catch"](function(b){a.payButton=!1})})["catch"](function(b){a.payButton=!1}),a.pay=function(){var b={statement_descriptor:a.params.statement_descriptor,description:a.params.description,user_token:a.AuthToken},c=Base64.encode(Base64.decode(a.params.merchant_id)+":"+Base64.decode(a.params.merchant_secret));f.pay(c,b).then(function(a){console.log(a)})["catch"](function(a){console.log(error)})},a.closeWindow=function(){g.remove("AtoB"),window.close()}}]),angular.module("a2BClientApp").controller("UserCtrl",["$scope","UserService","$location","$rootScope","$cookies","$cookieStore",function(a,b,c,d,e,f){e.get("AtoB")?c.path("/userprofile"):c.path("/"),$("#login-form-link").click(function(a){$("#register-form").fadeOut(100)}),$("#register-form-link").click(function(a){$("#login-form").fadeOut(100),$("#login-form-link").text("Register"),$("#register-form").delay(100).fadeIn(100),$("#login-form-link").unbind("click")}),$("#login-form-lin").click(function(a){$("#login-form").delay(100).fadeIn(100),$("#register-form").fadeOut(100),$("#login-form-link").text("Login"),$("#register-form")[0].reset()}),$("login-submit").on("click",function(){$(this).siblings().removeClass("active"),$(this).addClass("active")}),a.registerUser=function(){a.registerButton=!0,b.register(a.user).then(function(b){$("#login-form").delay(100).fadeIn(100),$("#register-form").fadeOut(100),$("#register-form-link").removeClass("active"),$("#login-form-link").addClass("active"),$("#login-form-link").text("Login"),a.message="You have Registered Successfully Please verify and Login",setTimeout(function(){$("#mydiv").fadeOut()},3e3)})["catch"](function(b){a.registerButton=!1})},a.login=function(){a.loginButton=!0,b.login(a.user).then(function(b){a.serverMessage="",c.path("/userprofile");b.user;e.put("AtoB",JSON.stringify({user:b}))})["catch"](function(b){a.error=b.message,a.loginButton=!1,c.path("/")})},a["delete"]=function(c){b["delete"](c).then(function(a){d.user=a.user})["catch"](function(b){a.error=b})}}]),angular.module("a2BClientApp").service("UserService",["$q","$http","$resource","$rootScope","$cookieStore",function(a,b,c,d,e){var f=window.location.origin;this.userDetails=function(){var c=a.defer(),e=JSON.parse($cookies.get("AtoB")).user;d.user=e.user;({Authorization:d.user.token});return b.get(f+"/api/user").success(function(a){d.user=a,c.resolve(a)}).error(function(a){c.reject(a)}),c.promise},this.register=function(c){var d=a.defer();return b.post(f+"/api/user/signup",c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this.login=function(c){var e=a.defer();return console.log(f+"/api/user/login"),b.post(f+"/api/user/login",c).success(function(a){d.user=a,e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},this.logout=function(c){var d=a.defer(),e={Authorization:"Bearer "+c};return b.get(f+"/api/user/logout",{headers:e}).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this["delete"]=function(c){var d=a.defer();return b["delete"](f+"/api/user/id",c).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise},this.existMerchant=function(c,d){var e=a.defer();return b.post(f+"/api/user/exists",d,{headers:{Authorization:"Bearer "+c}}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise}}]),angular.module("a2BClientApp").service("PaymentService",["$q","$http","$resource","$rootScope","$cookieStore",function(a,b,c,d,e){var f=window.location.origin;this.userAuthorization=function(c,d){console.log(d),console.log(c);var e=a.defer();return b.post(f+"/api/user/authorize",d,{headers:{Authorization:"Bearer "+c}}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},this.pay=function(c,d){var e=a.defer();return console.log("merchantData",c),b.post(f+"/api/user/payment",d,{headers:{Authorization:"Basic "+c}}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise}}]),angular.module("a2BClientApp").run(["$templateCache",function(a){a.put("views/forgotPassword.html",'<div class="container"> <form id="forgotPassword" name="forgotPasswordForm"> <div class="row"> <div class="col-md-6"> <input type="email" class="form-control" name="email" placeholder="Email" value="" ng-model="userLogin.email" required> <div style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid"> Email is not Valid </div> <br> <button class="btn btn-primary center-block" value="Submit" ng-click="login(userLogin)" ng-disabled="myForm.$invalid">Submit</button> </div> </div> </form> </div>'),a.put("views/login.html",'<div class="container"> <div class="well col-xs-offset-3 text-center"> <h3>A2B Login Page</h3> </div> <div class="row"> <div class="col-md-6 col-md-offset-3"> <div class="panel panel-login"> <div class="panel-heading"> <div class="row center-block"> <div class="col-xs-8 col-center clearfix"> <div class="col-xs-12" style="text-align:center"> <div class="col-xs-12"> <span class="active loginPageStyle" id="login-form-link">Login</span> <p class="col-center border_line"> </p> </div> <!-- <div class="col-xs-6"> --> <!-- <span class="active" id="register-form-link">Register</span> --> <!-- </div> --> </div> </div> </div> <!-- end of row --> </div> <!-- end panel heading --> <div class="panel-body"> <div class="row"> <div class="col-lg-12"> <!-- ================================================================================ --> <form id="login-form" name="myForm" style="display:block" novalidate> <p id="mydiv" style="color: red" ng-if="error">{{error}}</p> <div class="form-group"> <input type="email" class="form-control" name="userName" placeholder="Email" value="" ng-model="user.userName" required> <div style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">Email is not Valid </div> </div> <div class="form-group"> <input type="password" class="form-control" name="password" placeholder="Password" value="" ng-model="user.password" required> </div> <div class="form-group"> <div class="row"> <div class="col-sm-6 col-sm-offset-3"> <button class="form-control btn btn-login" value="Log In" ng-click="login()" ng-disabled="myForm.$invalid || loginButton">login</button> <div class="text-center"> <a href="#/forgotPassword" class="forgot-password">Forgot Password ?</a> </div> </div> </div> </div> <p id="mydiv" ng-if="message">{{message}}</p> <button class="active pull-right joinUs" id="register-form-link">Join Us?</button><span class="pull-right alreadyMember">Not a Member Yet ?</span> </form> <!-- 						</==================================================================================== --> <form id="register-form" name="myForm2" style="display: none"> <div class="form-group"> <input type="text" class="form-control" name="fullName" placeholder="FullName" ng-model="user.fullName" ng-minlength="3" ng-maxlength="25" ng-pattern="/^[a-zA-Z]/" required> <div role="alert"> <span class="error" ng-show="myForm2.fullName.$error.minlength"> Too short!</span> <span class="error" ng-show="myForm2.fullName.$error.maxlength"> Too long!</span> <span class="error" ng-show="myForm2.fullName.$error.pattern"> Name is not proper</span> </div> </div> <div class="form-group"> <input type="text" class="form-control" placeholder="Contact No." name="phoneNumber" ng-model="user.phoneNumber" ng-maxlength="10" ng-pattern="/[2-9]{2}\\d{7}/" required> <div role="alert"> <span class="error" ng-show="myForm2.phoneNumber.$error.maxlength"> Phone Number should not be more then 10 digits</span> <span class="error" ng-show="myForm2.phoneNumber.$error.pattern"> *Please enter digits only</span> </div> </div> <div class="form-group"> <input type="email" class="form-control" name="email" placeholder="Email Address" ng-model="user.email" required> <div style="color:red" ng-show="myForm2.email.$dirty && myForm2.email.$invalid">Email is not Valid </div> </div> <div class="form-group"> <input type="password" class="form-control" name="password" placeholder="Password" ng-model="user.password" ng-minlength="5" required> <div role="alert"> <span class="error" ng-show="myForm2.password.$error.minlength">Password should not be less then 5 characters</span> </div> </div> <div class="form-group"> <input type="password" class="form-control" name="conform_password" placeholder="Confirm Password" ng-model="conformPassword" required> <div role="alert"> <span class="error" ng-class="{\'hide\' : conformPassword == user.password}">Password does not match</span> </div> </div> <div class="form-group"> <input type="text" class="form-control" name="addressLine1" placeholder="Address Line-1" ng-model="user.addressLine1" required> </div> <div class="form-group"> <input type="text" class="form-control" name="addressLine2" placeholder="Address Line-2" ng-model="user.addressLine2" required> </div> <div class="form-group"> <input type="text" class="form-control" name="addressLine3" placeholder="Address Line-3" ng-model="user.addressLine3"> </div> <div class="form-group"> <div class="row"> <div class="col-xs-6"> <input type="text" class="form-control" name="city" placeholder="City" ng-model="user.city" required> </div> <!-- <div class="col-xs-4">\n							<input type="text" class="form-control" name="country" placeholder="Country" ng-model="user.country" required>\n						</div> --> <div class="col-xs-6"> <input type="text" class="form-control" name="pinCode" placeholder="Pin Code" ng-model="user.pinCode" ng-pattern="/^\\d{6}$/" required> <div role="alert"> <span class="error" ng-show="myForm2.pinCode.$error.pattern"> Please enter 6 digits Pin Code</span> </div> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-sm-6 col-sm-offset-3"> <button class="form-control btn btn-register" value="Register Now" ng-click="registerUser()" ng-disabled="myForm2.$invalid || registerButton">Register</button> </div> </div> </div> <p ng-if="error">{{error}}</p> <button class="active pull-right joinUs" id="login-form-lin">Go and Login</button><span class="pull-right alreadyMember">Already a Member ?</span> </form> <!-- =============================================================================== --> </div> </div> </div> <!-- end of panel body --> </div> <!-- end of panel --> </div> <!-- end of col-md-6 --> </div> <!-- end of row --> <div id="declineMsg" style="display:none"> You have declined the payment Please login again and pay</div> </div> <!-- end of container -->'),a.put("views/userProfile.html",'<nav class="navbar navbar-default navbar-fixed-top"> <div class="container"> <div class="navbar-header pull-left"> <a class="navbar-brand" href="">A2B</a> </div> </div> <!-- end of container --> </nav> <!-- end of navbar --> <!-- ================================================================================ --> <div class="container"> <div class="row" style="margin-top: 20px"> <div class="col-xs-12"> <div class="panel panel-default"> <div class="panel-heading">Welcome <span class="pull-right">Wallet Amount: 5000 INR</span> </div> <div class="panel-body"> <p>Flipkart wants to charge this amount: 100 INR</p> </div> </div> </div> <!-- end of col-xs-12 --> </div> <!-- end of row --> <div> <p class="pull-left"><a href=""> Privacy Policy</a></p> <p class="pull-right"> <button class="btn btn-primary" ng-click="pay()" ng-disabled="payButton">Pay</button> <button class="btn btn-danger decline" ng-click="closeWindow()"> Decline </button> </p> </div> </div> <!-- end of container -->')}]);