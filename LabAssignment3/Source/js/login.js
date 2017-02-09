/**
 * Created by Esha Mayuri on 2/5/2017.
 */
/**
 * Created by Esha Mayuri on 1/30/2017.
 */
var myApp = angular.module("ValidationPage",[]);
myApp.controller('validation', ['$scope', function($scope){

    $scope.gmail =
        {
            username: "",
            email: "",
            id:""
        };

    $scope.login = function () {

        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var emailbool = $scope.validateEmail(email);
        if (emailbool == true)
        {
            if(password.length > 0)
            {
                alert("Login Successful");
                window.location.href = "./home.html";
            }
            else
            {
                alert("Please enter password");
            }
        }
        else {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
        }
    }
    $scope.validateEmail = function(email) {
        var x = email;
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            alert("Not a valid e-mail address");
            return false;
        }
        else {
            return true;
        }
    }

    $scope.OnGoogleLogin = function () {

        var params = {
            'clientid': '502049869375-7bcq1i0usabeoa8okovmske4gii7b61t.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback': function (result) {
                if (result['status']['signed_in']) {
                    var request = gapi.client.plus.people.get({
                        userId: 'me'
                    });
                    request.execute(function (resp) {
                        $scope.$apply(function () {
                            $scope.gmail.username = resp.displayName;
                            $scope.gmail.email = resp.emails[0].value;
                            $scope.gmail.id = resp.id;
                            localStorage.setItem("username",resp.displayName);
                            localStorage.setItem("email",resp.emails[0].value);
                            localStorage.setItem("id",resp.id);
                            if(localStorage.getItem("username").length > 0 && localStorage.length > 0
                            && localStorage.getItem("id").length > 0)
                            {
                                window.location.href = "./home.html";
                            }
                        });

                    });
                }

            },
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
            //'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(params);
    }
}]);
//
// var storageKey = 'socialData';
//     // Reads stored social login data in local storage
// var getStoredSocialLoginData = function() {
//     var data = localStorage.getItem(storageKey);
//     if (data){
//         return JSON.parse(data);
//     }
// };
// // Sets social login data in local storage.
// var storeSocialLoginData = function(data){
//     if (!data){
//         localStorage.setItem(storageKey, null);
//     } else {
//         localStorage.setItem(storageKey, JSON.stringify(data));
//     }
// }
// .controller('validation', function ($scope) {
//     $scope.authenticateExternalProvider = function (provider) {
//         baasicLoginService.social.get(provider, returnUrl)
//             .success(function (data) {
//                 // We are remembering the response and provider and are storing some additional data in the local storage.
//                 data.provider = provider;
//                 data.activationUrl = activationUrl;
//                 storeSocialLoginData(data);
//                 window.location.href = data.redirectUri;
//             })
//             .error(function (data, status) {
//                 var text = 'An error has occurred while fetching login social login parameters.';
//                 if (data.error) {
//                     text = data.error_description;
//                 }
//                 vm.socialLogin.notification = text;
//             })
//     }})