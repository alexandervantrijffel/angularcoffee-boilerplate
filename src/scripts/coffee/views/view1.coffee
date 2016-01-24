# CoffeeScript
angular.module('myApp.view1', [ 'ngRoute']).config([
  '$routeProvider', ($routeProvider) ->
    $routeProvider.when '/view1',
      templateUrl: 'views/view1.html'
      controller: 'View1Controller'
]).controller 'View1Controller', ['notifier', (notifier) ->
    notifier.info "Message test", "Example message by notifier service."
 ]
