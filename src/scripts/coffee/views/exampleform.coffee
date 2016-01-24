angular.module("myApp.exampleform", ['ngRoute']).config([
    '$routeProvider', ($routeProvider) ->
        $routeProvider.when '/exampleform',
            templateUrl: 'views/exampleform.html'
            controller: 'ExampleFormController'
]).controller "ExampleFormController", ["notifier", (notifier) ->

]