/**
 * Created by Esha Mayuri on 1/30/2017.
 */

angular.module('ValidationPage', [])
    .controller('validation', function ($scope) {
        //registers users and store data locally
        $scope.registerFunction = function () {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var confirm = document.getElementById('confirm').value;
            if (name.length > 0 && email.length > 0 && username.length > 0 && password.length > 0 && confirm.length > 0)
            {
                var emailbool = $scope.validateEmail(email);
                if (emailbool == true)
                {
                    if (password == confirm)
                    {
                        // localStorage.emailId = email.value;
                        // localStorage.pwd = password.value;
                        localStorage.setItem("emailId",email);
                        localStorage.setItem("pwd",password);
                        alert("Registration successful");
                        window.location.href = "./login.html";
                    }
                    else {
                        alert("password mismatch");
                    }
                }
                else {
                    alert("Not a valid e-mail address");
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("confirm").value = "";
                }
            }
            else
            {
                if(name.length== 0)
                {
                    alert("Please enter your name");
                }
                else if(email.length== 0)
                {
                    alert("Please enter your email id");
                }
                else if(username.length== 0)
                {
                    alert("Please enter your User name");
                }
                else if(password.length== 0)
                {
                    alert("Please enter your password");
                }
                else if(confirm.length== 0)
                {
                    alert("Please enter your password");
                }
            }
        }
        //Login into home page
        $scope.login = function () {

            var password = document.getElementById('password').value;
            var email = document.getElementById('email').value;
            var localemail = localStorage.getItem("emailId");
            var localpwd = localStorage.getItem("pwd");
            if(email.length>0)
            {
                if(password.length> 0)
                {
                    //var emailbool = $scope.validateEmail(email);
                    if (email == localemail)
                    {
                        if(password == localpwd)
                        {
                            alert("Login Successful, redirecting to Home Page");
                            window.location.href = "./home.html";
                        }
                        else
                        {
                            alert("Invalid password");
                        }
                    }
                    else
                    {
                        alert("Invalid emailID");
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                    }
                }
                else
                {
                    alert("Please enter your password");
                }
            }
            else
            {
                alert("Please enter emailId");
            }
        }

        //redirect to registration page
        $scope.registerNewUserFunction = function () {
            window.location.href = "./register.html"
            //window.open("./register.html");
        }

        //validating email id
        $scope.validateEmail = function(email) {
            var x = email;
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                return false;
            }
            else {
                return true;
            }
        }
    });
