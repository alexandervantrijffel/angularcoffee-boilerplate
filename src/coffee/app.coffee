angular.module('myApp', [
  'ngRoute'
  'myApp.view1'
  'myApp.view2'
  'myApp.version'
]).config [
  '$routeProvider','$httpProvider',($routeProvider,$httpProvider) ->
    $routeProvider.otherwise redirectTo: '/view1'
    
    
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
    ###*
    The workhorse; converts an object to x-www-form-urlencoded serialization.
    @param {Object} obj
    @return {String}
    ###
    param = (obj) ->
        query = ""
        name = undefined
        value = undefined
        fullSubName = undefined
        subName = undefined
        subValue = undefined
        innerObj = undefined
        i = undefined
        for name of obj
            value = obj[name]
            if value instanceof Array
                i = 0
                while i < value.length
                    subValue = value[i]
                    fullSubName = name + "[" + i + "]"
                    innerObj = {}
                    innerObj[fullSubName] = subValue
                    query += param(innerObj) + "&"
                    ++i
            else if value instanceof Object
                for subName of value
                    subValue = value[subName]
                    fullSubName = name + "[" + subName + "]"
                    innerObj = {}
                    innerObj[fullSubName] = subValue
                    query += param(innerObj) + "&"
            else query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&"  if value isnt `undefined` and value isnt null
        (if query.length then query.substr(0, query.length - 1) else query)
    # Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [(data) ->
        (if angular.isObject(data) and String(data) isnt "[object File]" then param(data) else data)
    ]
]

angular.module('myApp').factory