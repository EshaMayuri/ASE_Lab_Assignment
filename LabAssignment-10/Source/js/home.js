/**
 * Created by Esha Mayuri on 3/30/2017.
 */
var myapp = angular.module('home',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('HomeController',function($scope,$http){
    $scope.credlist = new Array();
    $scope.FetchData = function() {
        var dataParams = {
            '_id' : $scope._id,
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'password' : $scope.password
        };
        $scope.cred = new Array();
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('http://127.0.0.1:8081/get');
        req.success(function (data, status, headers, config) {
            console.log(data);
            if(localStorage.getItem("emailId").match("admin")) {
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].email.match("admin")) {
                        $scope.credlist[i] = {
                            '_id': data[i]._id,
                            'fname': data[i].fname,
                            'lname': data[i].lname,
                            'email': data[i].email,
                            'password': data[i].password
                        }
                    }
                }
            }
            else
            {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].email == localStorage.getItem("emailId")) {
                        $scope.credlist[0] = {
                            '_id': data[i]._id,
                            'fname': data[i].fname,
                            'lname': data[i].lname,
                            'email': data[i].email,
                            'password': data[i].password
                        }
                    }
                }
            }
        })
        req.error(function (data, status, headers, config) {
            alert("There was some error processing your request. Please try after some time.");
        });
    };
    $scope.Update = function(cred,callback) {
        // var dataParams = {
        //     //'_id' : cred._id,
        //     'fname' : cred.fname,
        //     'lname' : cred.lname,
        //     'email' : cred.email,
        //     'password' : crded.password
        // };
        //alert(dataParams._id);
        $http.post('http://127.0.0.1:8081/update',cred)
            .success(function(data){
                alert(data);
                console.log("Successfully updated credentials");
                //$scope.FetchData();
            });
    }
    $scope.Delete = function(cred,callback) {
        alert("Deleting professor details ");
        $http.post('http://127.0.0.1:8081/delete', cred)
            .success(function(data){
                console.log("Successfully deleted professor details");
                //$scope.FetchData();
                window.location.href = "./home.html";
            });
    }

    $scope.AddNew = function () {
        window.location.href = "./AddCred.html";
    }
});
