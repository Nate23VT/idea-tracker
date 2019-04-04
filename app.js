var myApp = angular
  .module('formApp', ['ngMaterial', 'ngAnimate','ngRoute'])
  .config(function($mdThemingProvider,$routeProvider) {
    $routeProvider
    .when("/", {
      controller: "ideasCtrl",
      templateUrl : "ideas.htm"
    })
    .when("/new", {
      controller: "mainCtrl",
      templateUrl : "new.htm"
    })
    .when("/dashboard", {
      controller: "dashCtrl",
      templateUrl : "dashboard.htm"
    });
  });

  myApp.controller('mainCtrl',function($scope) {
    

  });

  myApp.controller('ideasCtrl',function($scope) {
    

  });

  myApp.controller('dashCtrl',function($scope) {
    

  });