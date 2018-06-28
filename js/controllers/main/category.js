app.controller('categoryController', function ($q, $scope, $rootScope, $location, $http) {
    $http.get("data/product-list.json").then(function (response) {
      $scope.categories = angular.fromJson(response.data.categories);
    });
});