(function () {

  var myApp = angular
    .module('formApp', ['ngMaterial', 'ngAnimate'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('green');
  })

  .controller('formCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.formParams = [];
      $scope.calcScore = [];
      $scope.stage = "";
      $scope.formValidation = false;
      $scope.toggleJSONView = false;
      $scope.toggleFormErrorsView = false;
      $scope.formContent = [{
        title: "Cost Reduction/Revenue Increase",
        name: "costReduction",
        weight: 0.20,
        txt: "The best innovations cut costs while simultaneously adding value. That is why cost reduction is the one of the highest weighted metric when evaluating new ideas. Also included in this calculation are possible innovations that introduce business growth and new revenue increases as a result of implementing the idea. The numbers in this metric are baseline ('ballpark') estimates. Be opportunistic in this estimate as it may not be known yet the true evaluation of the idea. Too specific of an estimate can result in a lower score when the idea can be proved to have a much higher return on investment once the proof of concept begins.",
        values: [
          {value: 1, label: "$0 - $10,000"}, 
          {value: 4, label: "$10,000 - $50,000"}, 
          {value: 6, label: "$50,000 - $250,000"}, 
          {value: 8, label: "$250,000 - $1,000,000"}, 
          {value: 10, label: "$1,000,000+"}
        ]
      },{
        title: "Enterprise Value",
        name: "enterpriseValue",
        weight: 0.15,
        txt: "Enterprise value is a metric to address whether the idea can be scaled to other business units within Dominion Energy as well as possibly scaling to new business opportunities outside of the company.",
        values: [
          {value: 1, label: "Unable to scale outside of initial business group"}, 
          {value: 4, label: "Scalable to other business units, but not all"}, 
          {value: 6, label: "Scalable to All Business Units, but requires additional work or configuration"}, 
          {value: 8, label: "Easily scalable to All Business Units"}, 
          {value: 10, label: "Opportunities to scale outside of Dominion Energy"}
        ]
      },{
        title: "Speed To Market",
        name: "speedToMarket",
        weight: 0.15,
        txt: "Speed to market is a metric to address how quickly the idea can be implemented by assessing the overall technical feasibility of both the idea in the marketplace, as well as, its current capability within the organization.",
        values: [
          {value: 1, label: "More than 1 year to implement"}, 
          {value: 4, label: "Can be implemented within a year"}, 
          {value: 6, label: "Can be implemented in less than 6 months"}, 
          {value: 8, label: "Can be implemented in less than 3 months"}, 
          {value: 10, label: "Can be implemented in less than 1 month"}
        ]
      }];

      $scope.calculateScore = function(formType,score,weight) {
        var typeScore = Math.round((score*weight)*10);
        $scope.calcScore.push({ formType: formType, score: typeScore });
        console.log($scope.calcScore);
      }
      
    /*
    |--------------------------------------------------------------------------
    |  Submit Form
    |--------------------------------------------------------------------------
    */
    $scope.submitForm = function () {
    var wsUrl = "url";

    // Check form validity and submit data using $http
    if ($scope.multiStepForm.$valid) {
      $scope.formValidation = false;

      $http({
        method: 'POST',
        url: wsUrl,
        data: JSON.stringify($scope.formParams)
      }).then(function successCallback(response) {
        if (response && response.data && response.data.status && response.data.status === 'success') {
          $scope.stage = "success";
        } else {
          if (response && response.data && response.data.status && response.data.status === 'error') {
              $scope.stage = "error";
            }
        }
      }, function errorCallback(response) {
          $scope.stage = "error";
          console.log(response);
      });
    }
    };
      
    /*
    |--------------------------------------------------------------------------
    |  DESTROY
    |--------------------------------------------------------------------------
    */
    $scope.reset = function() {
        // Clean up scope before destorying
        $scope.formParams = {};
        $scope.stage = "";
      }
    }]);
    
    myApp.filter('percentage', ['$filter', function ($filter) {
      return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
      };
    }]);

})();