describe('homeCtrl', function() {
	var scope, httpBackend;
	
	beforeEach(angular.mock.module('app'));
	beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, $http) {
		scope = $rootScope.$new();
        httpBackend = $httpBackend;
        //httpBackend.when("GET", "http://127.0.0.1:8100/#/login").respond([{}, {}, {}]);
        $controller('homeCtrl', {$scope: scope,$http: $http});
	}));

	it("checks whether search is getting triggered or not", function () {
		/*httpBackend.flush();*/
        scope.search();
       alert(scope.data);
       expect(scope.data.length).toBe(3);
	});
    
    //trial
    it('has a dummy spec to test 2 + 2', function() {
    // An intentionally failing test. No code within expect() will never equal 4.
    expect(4).toEqual(4);
    });
    
});



describe('registerCtrl', function() {
  var $scope, controller, $location, $window;

  beforeEach(module('app'));

  beforeEach(function() {
    angular.module('myApp').value('$localStorage', {})
  })

  beforeEach(inject(function($rootScope, $controller, _$window_) {
    $scope = $rootScope.$new();
    $window = _$window_;
    $location = jasmine.createSpyObj('$location', ['url']);
    controller = $controller('registerCtrl', {
      $scope: $scope,
      $location: $location,
      $window: $window
    });
  }));


  it('alert on wrong details', inject(function($httpBackend) {
    
    spyOn($window, 'alert');
    $httpBackend.expectPOST('/log').respond(200, {
      access: {
        state: 202
      }
    });    
    $scope.log();    
    $httpBackend.flush();
    expect($window.alert).toHaveBeenCalledWith('Sorry you don\'t have permission')
  }));

})


describe("Unit Tests", function() {

  beforeEach(angular.mock.module('app'));

  it('should have a LoginCtrl controller', function() {
    expect(app.LoginCtrl).toBeDefined();
  });
  
});


describe('testController', function () {
    var $controller, $scope, AuthenticationService;
    var dt = {un: "mayuri.esha@gmail.com", pwd: "sample"};

   beforeEach(module('app', {
  LoginService : { Login: jasmine.createSpy().and.returnValue(dt) }
		}));

    beforeEach(inject(function(_$controller_, $rootScope, _LoginService_){
        $scope = $rootScope.$new();
        LoginService = _LoginService_;
        $controller = _$controller_("LoginController", {
            $scope : $scope,
            AuthenticationService : AuthenticationService
        })
    }));

    it("should load the service", function(){
        expect(LoginService.Login).toHaveBeenCalled();
    })
});

