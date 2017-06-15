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
      oneTimeValue: 100,
      monthlyValue: 50
    }, {
      itemName: "Investor Transparent",
      oneTimeValue: 50,
      monthlyValue: 25
    }, {
      itemName: "Investor X",
      oneTimeValue: 25,
      monthlyValue: 85
    }
  ];

  $scope.expenseItems  = [
    {
      itemName: "Expense X",
      oneTimeValue: 500,
      monthlyValue: 20
    }, {
      itemName: "Expense Y",
      oneTimeValue: 200,
      monthlyValue: 40
    }
  ];

  $scope.revenueOneTimeTotal = 0;
  $scope.revenueMonthlyTotal = 0;
  $scope.expenseOneTimeTotal = 0;
  $scope.expenseMonthlyTotal = 0;

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

  // Finish or throw away
  $scope.verifyNumbers = function(oneTimeValue, monthlyValue) {
    return angular.isNumber(oneTimeValue)
  }
  // One-Time Revenue = Sum of the one-time column of all revenue items
  // Monthly Revenue = Sum of the monthly column of all revenue items
  // One-Time Expense = Sum of the one-time column of all expense items
  // Monthly Expense = Sum of the monthly column of all expense items
  
  // Total Revenue = One-Time Revenue + Monthly Revenue * 12
  // Total Expenses = One-Time Expense + Monthly Expenses * 12
  // Monthly Contribution Profit = Monthly Revenue – Monthly Expenses
  // Total Contribution Profit = Total Revenue – Total Expenses
  // Contribution Margin = Total Contribution Profit / Total Revenue
  // Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit
  $scope.calculateRoi = function() {
    $scope.revenueOneTimeTotal = $scope.adder($scope.revenueItems, 'once');
    $scope.revenueMonthlyTotal = $scope.adder($scope.revenueItems, 'monthly');
    $scope.revenueTotal = $scope.revenueOneTimeTotal + $scope.revenueMonthlyTotal*12;

    $scope.expenseOneTimeTotal = $scope.adder($scope.expenseItems, 'once');
    $scope.expenseMonthlyTotal = $scope.adder($scope.expenseItems, 'monthly');
    $scope.expenseTotal = $scope.expenseOneTimeTotal + $scope.expenseMonthlyTotal*12;

    $scope.contributionProfitMonthly = $scope.revenueMonthlyTotal - $scope.expenseMonthlyTotal;
    $scope.contributionProfitTotal = $scope.revenueTotal - $scope.expenseTotal;
    $scope.contributionMargin = ($scope.contributionProfitTotal/$scope.revenueTotal)*100;
    $scope.capitalRoi = ($scope.expenseOneTimeTotal - $scope.revenueOneTimeTotal ) / $scope.contributionProfitMonthly;
  }

  $scope.adder = function(array, key) {
    var total = 0;
    if (key == 'once') {
      angular.forEach(array, function(item) {
        return total += item.oneTimeValue;
      });
    }
    else {
      angular.forEach(array, function(item) {
        return total += item.monthlyValue;
      });
    }
    return total;
  }

// BUG: deleteEntry() gets triggered when you hit ENTER key when filling out a new entry
//      no way of differentiating click vs ENTER event bc e.type outputs 'click' for both enter and clicks....
// BUG FIX: place 'type=button' attr for each delete button. Any button in a form is type 'submit' by default!

// Discuss: inline click event vs. built out function in controller
  $scope.deleteEntry = function(index, roiArray) {    
    roiArray.splice(index, 1);
    $scope.calculateRoi();
  };

  $scope.calculateRoi();

});