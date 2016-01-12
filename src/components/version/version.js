'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])
// MAJOR.MINOR.PATCH VERSION
.value('version', '0.1.1');
