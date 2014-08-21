// Angular JS Code
(function () {
var app = angular.module('transactionList', []);

app.controller('CSVController', function ($scope) {
    //$scope.date = new Date();
    this.data = $scope.data;
    this.show = -1;
    this.months = Months;
    this.setResults = function () {
        try {
            this.results = $scope.results;
            $scope.credit = $scope.debit = 0.0;
            $scope.results.forEach(this.setTotals);
        } catch (e) {
            console.log(e);
        }
    };
    // Iterates through result set.
    this.setTotals = function (result) {
        result.DateObj = new Date(result.Date);
        result.Month = new Date(result.Date).getMonth();
        console.log(result.Month);
        if (result["Transaction Type"] == "credit") {
            $scope.credit += parseFloat(result.Amount);
        }
        else {
            $scope.debit += parseFloat(result.Amount);
        }
    };
    this.setRowClass = function (transactionType) {
        if (transactionType == "debit") {
            return "panel-danger";
        } else if (transactionType == "credit") {
            return "panel-success";
        }
    };

    $scope.setData = function () {
        var reader = new FileReader();
        reader.readAsText($scope.file);
        reader.onload = function (event) {
            this.data = event.target.result;
            $scope.results = $.csv.toObjects(this.data);
            $scope.$apply();    
        };
        reader.onerror = function () { alert('Unable to read ' + file.fileName); };
    };
});

app.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.$apply("setData()");
            });
        }
    }
});


var Months = [{ Name: 'January', Value: 0 },
              { Name: 'February', Value: 1 },
              { Name: 'March', Value: 2 },
              { Name: 'April', Value: 3 },
              { Name: 'May', Value: 4 },
              { Name: 'June', Value: 5 },
              { Name: 'July', Value: 6 },
              { Name: 'August', Value: 7 },
              { Name: 'September', Value: 8 },
              { Name: 'October', Value: 9 },
              { Name: 'November', Value: 10 },
              { Name: 'December', Value: 11 }];

})();


