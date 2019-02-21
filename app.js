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
      $scope.totalScore = 0;
      
      $scope.rpaScore = 0;
      $scope.formParams.rpaFte = 0;
      $scope.formParams.rpaHourlyRate = 0;
      $scope.formParams.rpaWeekly = 0;
      $scope.rpaROI = 0;
      
      $scope.stage = "";
      $scope.formValidation = false;
      $scope.toggleJSONView = false;
      $scope.toggleFormErrorsView = false;
      $scope.technologies = [
        "AR/VR",
        "Big Data",
        "Internet of Things",
        "RPA"
      ];
      $scope.formContent = [{
        title: "Cost Reduction/Revenue Increase",
        name: "costReduction",
        weight: 0.25,
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
      },{
        title: "Safety",
        name: "safety",
        weight: 0.20,
        txt: "Safety is a core value and the highest priority at Dominion Energy.  Ideas related to safety shall be assessed accordingly based on what percentage of the workforce will be impacted by the implementation of the idea.",
        values: [
          {value: 1, label: "Does not improve safety"}, 
          {value: 4, label: "Improves safety for less than 25% of our workforce"}, 
          {value: 6, label: "Improves safety for 25-50% of our workforce"}, 
          {value: 8, label: "Improves safety for 50-90% of our workforce"}, 
          {value: 10, label: "Improves safety for 90%+ of our workforce"}
        ]
      },{
        title: "Sustainability",
        name: "sustainability",
        weight: 0.15,
        txt: "Sustainability is an important value at Dominion Energy as we strive to become the most sustainable energy company in America.  This sustainability vision assesses four areas: Environmental/social responsibility, Community partner, Customer-Focused, Employer of choice\nIdeas related to sustainability shall be assessed according to the number of impacted areas that fall within the new company vision.",
        values: [
          {value: 1, label: "Does not impact any of the 4 areas of our sustainability vision"}, 
          {value: 4, label: "Impacts 1 area of our sustainability vision"}, 
          {value: 6, label: "Impacts 2 areas of our sustainability vision"}, 
          {value: 8, label: "Impact 3 areas of our sustainability vision"}, 
          {value: 10, label: "Impacts all 4 areas of our sustainability vision"}
        ]
      },{
        title: "Organizational Learning Capability",
        name: "learning",
        weight: 0.10,
        txt: "Organizational Learning Capability is a metric to assess the potential for innovative solutions to drive educational growth across the organization by empowering our employees to gain experience working with new and emerging technology.",
        values: [
          {value: 1, label: "Idea or variation of the idea has been previously implemented with little success or proven value"}, 
          {value: 4, label: "Idea lacks creativity and learning opportunities for the organization"}, 
          {value: 6, label: "Nearly mature technology within the organization with limited interest to grow the capability"}, 
          {value: 8, label: "Technology exists within organization but idea presents an opportunity to grow the capability with new resources"}, 
          {value: 10, label: "New and emerging technology that is perceived to have wide applicability across the enterprise"}
        ]
      }];
      $scope.rpaContent = [{
        title: "FTE Manual Hours per Month",
        name: "rpa-hours",
        weight: 0.40,
        txt: "This metric assesses the number of hours spent by each full-time employee per month on the task under automation consideration.",
        values: [
          {value: 1, label: "Less than 5 hours per month"}, 
          {value: 4, label: "5 - 10 hours each month"}, 
          {value: 6, label: "10 - 40 hours each month"}, 
          {value: 8, label: "40 - 100 hours each month"}, 
          {value: 10, label: "Over 100 hours each month"}
        ]
      },{
        title: "Number of Employees",
        name: "rpa-employees",
        weight: 0.25,
        txt: "This metric assesses the number of full-time employee that work  on the task under automation consideration.",
        values: [
          {value: 1, label: "0 FTEs - Process is already automated"}, 
          {value: 4, label: "1 FTE"}, 
          {value: 6, label: "2 - 10 FTEs"}, 
          {value: 8, label: "10 - 25 FTEs"}, 
          {value: 10, label: "Over 25 FTEs"}
        ]
      },{
        title: "Process Frequency",
        name: "rpa-freq",
        weight: 0.10,
        txt: "This metric assesses the number of times the process is run by a full time employee.  The frequency is evaluated separate from the number of hours as this metric helps to also evaluate the lost productivity time switching between activities.",
        values: [
          {value: 1, label: "Process is run once a year"}, 
          {value: 4, label: "Process is run once a month"}, 
          {value: 6, label: "Process is run daily on business days (4-5 times a week)"}, 
          {value: 8, label: "Process is run more than twice a day (business days)"}, 
          {value: 10, label: "Process is run every day including weekends and holiday"}
        ]
      },{
        title: "Process Complexity",
        name: "rpa-complex",
        weight: 0.25,
        txt: "This metric assesses the complexity of a process by evaluating the number of steps including process variations and the integration points included in the process (ex: Outlook, SAP).  When referring to new integration points that includes integration points that have not been previously implemented within another part and are not part of the standard application suite. Website interactions are not considered integration points.",
        values: [
          {value: 1, label: "More than 3 new integrations points"}, 
          {value: 4, label: "More than 100 steps in the process and/or 2-3 new integration points"}, 
          {value: 6, label: "Less than 100 steps in the process and/or at most 1 new integration point"}, 
          {value: 8, label: "Less than 50 steps in the automation process with no new integration points"}, 
          {value: 10, label: "Less than 10 steps in the automation process with no new integration points"}
        ]
      }];
      $scope.calculateScore = function(tech,formType,score,weight) {
        var typeScore = Math.round((score*weight)*10);
        switch (tech) {
          case 'RPA':
            $scope.rpaScore += typeScore;
            break;
          default:
            $scope.totalScore += typeScore;
            break;
        }
        var id = $scope.calcScore.length + 1;
        var found = $scope.calcScore.some(function (el) {
          return el.formType === formType;
        });
        if (!found) { 
          $scope.calcScore.push({ formType: formType, score: typeScore }); 
        } else {
          angular.forEach($scope.calcScore, function (val, key) {
            if ($scope.calcScore[key].formType == formType)
              $scope.calcScore[key].score = typeScore;
          });
        }
      }
      $scope.calculateRPAROI = function() {
        $scope.rpaROI = $scope.formParams.rpaFte*$scope.formParams.rpaHourlyRate*($scope.formParams.rpaWeekly*52);
      }
      
    $scope.submitForm = function () {
    var wsUrl = "url";

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
      
    $scope.reset = function() {
        $scope.formParams = {};
        $scope.stage = "";
      }
    }]);

})();