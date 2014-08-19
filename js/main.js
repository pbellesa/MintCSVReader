// Application Code 





// Angular JS Code
(function () {
var app = angular.module('transactionList', []);

app.controller('CSVController', function ($scope) {
    this.data = $scope.data;
    this.show = -1;
    this.toObject = function () {
        try {
            this.results = $scope.results;
            
            this.error = "";
        } catch (e) {
            console.log(e);
            this.error = "Input CSV data.";
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
            console.log(this.results);
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


})();


