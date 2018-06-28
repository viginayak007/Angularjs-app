app.controller('productController', function ($q, $scope, $rootScope, $location, $http) {

    $http.get("data/subcategories.json").then(function (response) {
        $scope.subcategories = angular.fromJson(response.data.subcategories);
    });
    
    //Show Category
    $http.get("data/product-list.json").then(function (response) {
        $scope.products = angular.fromJson(response.data.products);
    });

});