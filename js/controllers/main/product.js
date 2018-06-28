app.controller('productController', function ($q, $scope, $rootScope, $location, $http) {
    $scope.accordianHeader = [];
    $scope.products = [];
    $http.get("data/product-list.json").then(function (response) {
        $scope.products = angular.fromJson(response.data.products);
    });
      
});