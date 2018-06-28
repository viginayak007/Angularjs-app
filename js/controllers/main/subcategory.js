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