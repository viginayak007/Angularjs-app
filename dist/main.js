var app = angular.module('App', ['ngRoute', 'ngCookies']);
// configure our routes
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
        .when('/', {
            templateUrl: 'view/home.html',
            controller: 'homeController'
        })
        .otherwise({
            redirectTo: '/login'
        });

}]);

app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http, $locationProvider) {

    $rootScope.globals = $cookieStore.get('globals') || {};
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if (!$rootScope.globals.username && !$rootScope.globals.password) {
            $location.path('/login');
        }
    });

}]);

window.onbeforeunload = confirmExit;

function confirmExit() {
    return "You have attempted to leave this page. Are you sure?";
}

app.controller('homeController', function ($scope, $rootScope, $location, $http) {
    $scope.userName = "User";
    //  $scope.pageurl = "view/product.html";
    
     $http.get("data/menu.json").then(function (response) {
        $scope.Data = angular.fromJson(response.data.menu);
    });

    $scope.changePage = function(pageURL){
        $scope.pageurl = "view/" + pageURL;
    };
});

app.controller('loginController', function ($scope, $rootScope, $location, $http, $cookieStore) {
    $scope.users =[];
     $scope.error = false;
    $http.get("data/login.json").then(function (response) {
        $scope.users = angular.fromJson(response.data.users);
    });

    $scope.submit = function(){
        if ($scope.user.ID && $scope.user.password){
            angular.forEach($scope.users, function (value, key) {
                if (value.userID === $scope.user.ID && value.password === $scope.user.password){
                    $scope.error = false;
                    $rootScope.globals.username = $scope.user.ID;
                     $rootScope.globals.password = $scope.user.password;
                    $cookieStore.put("username", $scope.user.ID);
                    $location.path('/');
                }else{
                    $scope.error = true;
                }
            });
        }
    }
});
app.controller('categoryController', function ($q, $scope, $rootScope, $location, $http) {
    $http.get("data/categories.json").then(function (response) {
      $scope.categories = angular.fromJson(response.data.categories);
    });
});
app.controller('productController', function ($q, $scope, $rootScope, $location, $http) {

    $http.get("data/subcategories.json").then(function (response) {
        $scope.subcategories = angular.fromJson(response.data.subcategories);
    });
    
    //Show Category
    $http.get("data/product-list.json").then(function (response) {
        $scope.products = angular.fromJson(response.data.products);
    });

});
app.controller('subcategoryController', function ($q, $scope, $rootScope, $location, $http) {
    
    //Bind category
    $http.get("data/categories.json").then(function (response) {
        $scope.categories = angular.fromJson(response.data.categories);
    });

    //view subcategory
    $http.get("data/subcategories.json").then(function (response) {
        $scope.subcategories = angular.fromJson(response.data.subcategories);
    });
});

