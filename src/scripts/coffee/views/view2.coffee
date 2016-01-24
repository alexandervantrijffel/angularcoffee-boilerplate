angular.module('myApp.view2', [ 'ngRoute' ]).config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when '/view2',
      templateUrl: 'views/view2.html'
      controller: 'View2Ctrl'
]).controller 'View2Ctrl', [ ->
 ]