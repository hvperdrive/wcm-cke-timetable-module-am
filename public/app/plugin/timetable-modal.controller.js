(function(angular) {
	angular.module("cke-timetable-am_0.0.3.controllers")
		.controller("timetableAMModalController", [

			"$scope",

			function($scope) {

				$scope.addDay = function addDay() {
					var newDate = new Date(_.get($scope.ngDialogData, "days." + ($scope.ngDialogData.days.length - 1) + ".meta.date", null));

					newDate.setDate(newDate.getDate() + 1);

					$scope.ngDialogData.days.push({
						meta: {
							date: newDate,
						},
						items: [{
							starttime: null,
							endtime: null,
							description: "",
						}],
					});
				};

				$scope.addItem = function addItem(dayIndex) {
					$scope.ngDialogData.days[dayIndex].items.push({
						starttime: null,
						endtime: null,
						description: "",
					});
				};

				$scope.removeDay = function removeDay(dayIndex) {
					$scope.ngDialogData.days.splice(dayIndex, 1);
				};

				$scope.removeItem = function removeItem(dayIndex, itemIndex) {
					$scope.ngDialogData.days[dayIndex].items.splice(itemIndex, 1);
				};
			},
		]);
})(window.angular);
