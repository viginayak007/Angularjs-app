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