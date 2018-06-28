
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