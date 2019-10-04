(function(angular) {
	angular.module("cke-timetable-am_0.0.5.controllers")
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
						startTime: undefined,
						endTime: undefined,
						description: "",
					});
				};

				$scope.sort = function sort(item) {
					if (!_.get(item, "startTime")) {
						// Will be compared to other strings that use ISO date format.
						// Using this string will ensure that empty values will be sorted to the end.
						return "z"
					}

					return _.get(item, "startTime");
				}

				$scope.removeDay = function removeDay(dayIndex) {
					$scope.ngDialogData.days.splice(dayIndex, 1);
				};

				$scope.removeItem = function removeItem(dayIndex, itemIndex) {
					$scope.ngDialogData.days[dayIndex].items.splice(itemIndex, 1);
				};
			},
		]);
})(window.angular);
