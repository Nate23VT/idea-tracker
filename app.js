var myApp = angular
  .module('formApp', ['ngMaterial', 'ngAnimate','ngRoute'])
  .config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
      controller: "mainCtrl",
      templateUrl : "pages/main.htm"
    })
    .when("/submit/:technology", {
      controller: "submitCtrl",
      templateUrl : "pages/submitIdea.htm"
    }).otherwise({
      redirectTo: '/'
  });
  $locationProvider.hashPrefix('');
});

myApp.controller('mainCtrl',function($scope, $http) {
  let url = "data/main.json";
  
  $http.get(url).then(
    function successCallback(response) {
      $scope.tiles = response.data;
    }, 
    function errorCallback(response) {
    //todo handle error
    }
  );
});

myApp.controller('submitCtrl',function($scope, $http, $routeParams) {
  $scope.tech = $routeParams.technology;
  let url = "data/submitIdea.json";
  
  $http.get(url).then(
    function successCallback(response) {
      $scope.form = response.data;
    }, 
    function errorCallback(response) {
    //todo handle error
    }
  );
});