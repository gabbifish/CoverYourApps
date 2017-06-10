'use strict';

var SketchyEmailController = myApp.controller('SketchyEmailController', ['$scope', '$rootScope', '$mdDialog', '$sce',
    function($scope, $rootScope, $mdDialog, $sce) {
        var ctrl = this;
        $scope.sketchyEmail = {};
        // Hacky module Controller acces TODO @Sasha can bind??
        $scope.module = $scope.$parent.$parent.$parent.$parent.module;

        // Add URL for sketchyUrl simulation if necessary, otherwise leave link
        // field blank.
        if (ctrl.slide.options[1].link != null) {
          $scope.sketchyUrl = ctrl.slide.options[1].link;
          console.log($scope.sketchyUrl);
        }

        $scope.sketchyEmail.delete = function(ev) {
            submitEmail(ev, ctrl.slide.options[0]);
        }

        $scope.sketchyEmail.reply = function(ev) {
            submitEmail(ev, ctrl.slide.options[1]);
        };


        // This code sucks - I'm so sorry.
        function feedbackHtml() {
            return $sce.trustAsHtml('<h4 class="answer">' + $scope.module.quizResponse + '</h4>' +
            '<br />'+
            '<h3 class="statistics-header">How did you do compared to others?</h3>' +
            '<div class="statistics">' + $scope.module.quizStatistics + '</div>');
        }

        function submitEmail(ev, option) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            ev.preventDefault();
            $scope.module.submitQuizResponse(option, function() {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(option.header)
                    .htmlContent(feedbackHtml())
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
                );
            });
        };
    }
]);

myApp.component('sketchyEmail', {
    templateUrl: '/components/sketchy-email/sketchyEmail.html',
    controller: 'SketchyEmailController',
    bindings: {
        slide: '<'
    }
});