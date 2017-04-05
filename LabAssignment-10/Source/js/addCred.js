/**
 * Created by Esha Mayuri on 3/30/2017.
 */
var myapp = angular.module('registration',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('RegistrationController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.password);
        var dataParams = {
            'fname' : $scope.formData.fname,
            'lname' : $scope.formData.lname,
            'email' : $scope.formData.email,
            'password' : $scope.formData.password
        };

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        var req = $http.post('http://127.0.0.1:8081/insert',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            alert("Added details succefully!");
            if($scope.formData.email.match("admin")) {
                window.location.href = "./login.html";
            }
            else
            {
                window.location.href = "./home.html";
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});