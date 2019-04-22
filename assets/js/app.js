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
  let url = "data/tech.json";
  
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
  $scope.data ={};
  $scope.techData ={};
  $scope.data.tech = $routeParams.technology;
  $scope.tech = $routeParams.technology;
  let url = "data/submitIdea.json";
  let techUrl = "data/tech.json";

  $scope.submit = function() {
    var result = [];
    console.log($scope.data)
    var scopeData = $.map($scope.data , function (value, key) {
        return [[key, value]];
    });
    console.log($scope.techData)
    var techData = $.map($scope.techData , function (value, key) {
      return [[key, value]];
    });
    result.push(scopeData);
    result.push(techData);
    console.log($scope.techData)
    /*
    $().SPServices({
      operation: "UpdateListItems",
      async: false,
      batchCmd: "New",
      listName: "Feedback",
      valuepairs: result,
      completefunc: function(xData, Status) {
        alert("completed");
      }
    });
    */
  };

  $scope.reset = function() {
    var cont = confirm("Are you sure you want to clear the form?");   //todo - make pretty
    if (cont) {
      $scope.data = null;
      $scope.techData = null;
    }
  };

  $scope.isRequired = function(isRequired) {
    if (isRequired == 'Y') {
      return true;
    } else {
      return false
    }
  };

  $http.get(url).then(
    function successCallback(response) {
      $scope.form = response.data;

      $http.get(techUrl).then(
        function successCallback(response) {
          $scope.techInfo = _.where(response.data, {title: $scope.tech})[0].content;
        }, 
        function errorCallback(response) {
        //todo handle error
        }
      );
    }, 
    function errorCallback(response) {
    //todo handle error
    }
  );
});