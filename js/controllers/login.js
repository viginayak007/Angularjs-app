
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