angular.module("myApp.exampleform", ['ngRoute']).config([
    '$routeProvider', ($routeProvider) ->
        $routeProvider.when '/exampleform',
            templateUrl: 'views/exampleform.html'
            controller: 'ExampleFormController'
]).controller "ExampleFormController", ["notifier", "$scope", (notifier, $scope) ->
    $scope.resultMessages = []
    $scope.submit = (form) =>
        if form.$valid
            mail = if $scope.vm.email then " (#{$scope.vm.email})" else ""
            msg = "#{$scope.vm.name} #{mail} says: #{$scope.vm.message}"
            # ngRepeat does not allow multiple items with the same value
            if msg not in $scope.resultMessages then $scope.resultMessages.push msg
        else
            notifier.info "Please check all required fields"
    $scope.cancel = () =>
        $scope.vm = {}
        $scope.exampleForm.$setPristine()
        $scope.exampleForm.$setUntouched()
]