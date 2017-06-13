'use strict';

angular.module('myApp.roiApp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, $scope) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'RoiCtrl'
  });
}])

.controller( 'RoiCtrl', function($scope) {
  $scope.revenueItems = [
    {
      itemName: "Investor Anon",
      oneTimeValue: 666,
      monthlyValue: 66
    }, {
      itemName: "Investor Transparent",
      oneTimeValue: 800,
      monthlyValue: 77
    }
  ];

  $scope.expenseItems  = [
    {
      itemName: "Expense X",
      oneTimeValue: 97900,
      monthlyValue: 666
    }, {
      itemName: "Expense Y",
      oneTimeValue: 79700,
      monthlyValue: 770
    }
  ];

  $scope.add = function(revenue) {
    if (revenue == 'revenue') {
      $scope.revenueItems.push({
        itemName: $scope.itemName,
        oneTimeValue: $scope.oneTimeValue,
        monthlyValue: $scope.monthlyValue
      });
    
      $scope.itemName = "";
      $scope.oneTimeValue = "";
      $scope.monthlyValue = "";
    }
    else {
        $scope.expenseItems.push({
        itemName: $scope.expenseItemName,
        oneTimeValue: $scope.expenseOneTimeValue,
        monthlyValue: $scope.expenseMonthlyValue
      });
    
      $scope.expenseItemName = "";
      $scope.expenseOneTimeValue = "";
      $scope.expenseMonthlyValue = "";
    }

  };

// Discuss: inline click event vs. built out function in controller
  $scope.deleteEntry = function(index, revenue, e) {
    if (revenue === 'revenue') {
      $scope.revenueItems.splice(index,1);
    }
    else {
      $scope.expenseItems.splice(index,1)
    }
  };

});