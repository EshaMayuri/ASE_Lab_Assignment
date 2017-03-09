angular.module('app.services', [])

.factory('LoginService',function($filter,$q){
        var service = {};
        service.GetUsernames = GetUsernames;
        service.CreateUser = CreateUser;
        service.isDuplicate = isDuplicate;
        service.getCredentials = getCredentials;

        return service;
    
    
        function getCredentials(LoginData){
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { Username: LoginData.un },{ Password: LoginData.pwd });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function isDuplicate(LoginData){
            var deferred = $q.defer();
            getCredentials(LoginData)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        deferred.resolve({ success: true });
                    } else {
                        deferred.resolve({ success: false, message: 'Invalid Credentails '});
                    }
                });
            return deferred.promise;
        }
        function CreateUser(registerData){
            var deferred = $q.defer();
            GetUsernames(registerData.un)
                .then(function (duplicateUser) {
                    if (duplicateUser !== null) {
                        console.log("duplicate  un:"+registerData.un+" "+registerData.pwd);
                        deferred.resolve({ success: false, message: 'Username "' + registerData.un + '" is already taken' });
                    } else {
                        var users = getUsers();
                        users.push(registerData);
                        setUsers(users);
                        deferred.resolve({ success: true });
                    }
                });
            return deferred.promise;
        };
        function GetUsernames(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { un: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        };
        function getUsers(){
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        };
        function setUsers(users){
            localStorage.users = JSON.stringify(users);
        };
    })


.factory('Tourism', function($http) {
  return {
    findEvents: function(location) {  
        console.log("location::"+location);
        if(location.includes(" "))
            location=location.replace(" ","+");
        var searchUrl= "https://www.mapquestapi.com/search/v2/radius?origin="+location+"&radius=6&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|472401&outFormat=json&key=XQ7oqsk8v31J0EjM3Gw7APACmd3Z9rh3&callback=JSON_CALLBACK"
        console.log("eventSearchURL::"+searchUrl);
        return $http.jsonp(searchUrl).then(function(response) {
             return response.data.searchResults;
      });
    }
  };
})


.factory('HomeService',function($filter,$q,$http){
        var service = {};
        return service;
     

})
