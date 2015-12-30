# CoffeeScript
angular.module('myApp.view1', [ 'ngRoute' ]).config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when '/view1',
      templateUrl: 'views/view1.html'
      controller: 'View1Ctrl'
]).controller 'View1Ctrl', [ ->
 ]
