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
      // add number validation function
      // if ($scope.verifyNumbers($scope.oneTimeValue, $scope.monthlyValue)) {
        $scope.revenueItems.push({
          itemName: $scope.itemName,
          oneTimeValue: $scope.oneTimeValue,
          monthlyValue: $scope.monthlyValue
        });
      
        $scope.itemName = "";
        $scope.oneTimeValue = "";
        $scope.monthlyValue = "";
      }
    // }
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
    $scope.calculateRoi();
  };

  $scope.verifyNumbers = function(oneTimeValue, monthlyValue) {
    return isNaN(oneTimeValue) 
  }

  $scope.calculateRoi = function() {
    alert('we did it!');
  }

// BUG: deleteEntry() gets triggered when you hit ENTER key when filling out a new entry
//      no way of differentiating click vs ENTER event bc e.type outputs 'click' for both enter and clicks....
// BUG FIX: place 'type=button' attr for each delete button. Any button in a form is type 'submit' by default!

// Discuss: inline click event vs. built out function in controller
  $scope.deleteEntry = function(index, roiArray) {    
    roiArray.splice(index, 1);
  };

});