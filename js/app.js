var app = angular.module("groceryListApp", []);

app.controller("HomeController", ["$scope", function ($scope) {
    $scope.title = "Grocery List Application";
}]);

app.controller("GroceryListItemsController", ["$scope", function ($scope) {
    $scope.groceryItems = [{
            completed: true,
            itemName: "Milk",
            date: "2020-01-02"
        },
        {
            completed: true,
            itemName: "Cookies",
            date: "2020-01-04"
        },
        {
            completed: true,
            itemName: "Ice cream",
            date: "2020-01-05"
        },
        {
            completed: true,
            itemName: "Potatoes",
            date: "2020-01-15"
        },
        {
            completed: true,
            itemName: "Cereal",
            date: "2020-01-25"
        }
    ]
}]);