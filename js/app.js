var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller: "HomeController"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemController"
        })
        .when("/addItem/edit/:id", {
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemController"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.service("GroceryService", function () {
    var groceryService = {};
    groceryService.groceryItems = [];

    groceryService.findById = function (id) {
        for (let i = 0; i < groceryService.groceryItems.length; i++) {
            if (groceryService.groceryItems[i].id === id) {
                return groceryService.groceryItems[i];
            }
        }
    };

    groceryService.getNewId = function () {
        if (groceryService.newId) {
            groceryService.newId++;
        } else {
            maxIdItem = _.max(groceryService.groceryItems, function (entry) {
                return entry.id;
            });
            groceryService.newId = maxIdItem.id ? maxIdItem.id + 1 : 1;
        };
        return groceryService.newId;
    };

    groceryService.save = function (entry) {
        var item = groceryService.findById(entry.id);
        if (item) {
            item.completed = entry.completed;
            item.itemName = entry.itemName;
            item.date = entry.date;
        } else {
            entry.id = groceryService.getNewId();
            groceryService.groceryItems.push(entry);
        };
    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function ($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;
}]);

app.controller("GroceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService",
    function ($scope, $routeParams, $location, GroceryService) {
        if ($routeParams.id) {
            $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
        } else {
            $scope.groceryItem = {
                id: 0,
                completed: true,
                itemName: "",
                date: new Date()
            };
        };
        $scope.save = function () {
            GroceryService.save($scope.groceryItem);
            $location.path("/");
        };
        console.log($scope.groceryItems);
    }
]);