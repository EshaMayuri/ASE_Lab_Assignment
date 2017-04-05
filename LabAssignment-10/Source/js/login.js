/**
 * Created by Esha Mayuri on 3/28/2017.
 */
var myapp = angular.module('login',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('LoginController',function($scope,$http){
    $scope.checkCredentials = function(){
        var dataParams = {
            'email' : $scope.email,
            'password' : $scope.password
        };
        $scope.cred = new Array();
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var string = $scope.formData.email.toString();
        var req = $http.get('http://127.0.0.1:8081/get',$scope.formData);
        req.success(function (data, status, headers, config) {
            console.log(data);
            if(!string.match("admin"))
            {
                for (var i = 0; i < data.length; i++) {
                    if ($scope.formData.email.toString() == data[i].email.toString() //"admin@mail.com"//
                        && $scope.formData.password.toString() == data[i].password.toString()) {//"admin"){//
                        localStorage.setItem("emailId",$scope.formData.email.toString());
                        window.location.href = "./home.html";
                    }
                }
            }
            else if($scope.formData.email.toString() == "admin@mail.com" &&
                $scope.formData.password.toString() == "admin")
            {
                localStorage.setItem("emailId",$scope.formData.email.toString());
                window.location.href = "./home.html";
            }
            // else
            // {
            //     alert("Only administrator can login");
            // }
        })
        req.error(function (data, status, headers, config) {
            alert("There was some error processing your request. Please try after some time.");
        });
    };
});

