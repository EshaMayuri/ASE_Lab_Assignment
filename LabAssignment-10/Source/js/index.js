/**
 * Created by Esha Mayuri on 3/28/2017.
 */
var myapp = angular.module('registration',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('RegistrationController',function($scope,$http){
    $scope.Login = function () {
        window.location.href = "./login.html";
    }
    $scope.SignUp = function () {
        window.location.href = "./signUp.html";
    }
});