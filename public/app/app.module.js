(function(angular) {
	angular.module("cke-timetable-am_1.0.0.filters", []);
	angular.module("cke-timetable-am_1.0.0.factories", ["cke-timetable-am_1.0.0.filters"]);
	angular.module("cke-timetable-am_1.0.0.services", ["cke-timetable-am_1.0.0.factories"]);
	angular.module("cke-timetable-am_1.0.0.controllers", ["cke-timetable-am_1.0.0.services"]);
	angular.module("cke-timetable-am_1.0.0.directives", ["cke-timetable-am_1.0.0.controllers"]);

	angular.module("cke-timetable-am_1.0.0", [

		"pelorus.services",

		"cke-timetable-am_1.0.0.filters",
		"cke-timetable-am_1.0.0.factories",
		"cke-timetable-am_1.0.0.services",
		"cke-timetable-am_1.0.0.controllers",
		"cke-timetable-am_1.0.0.directives",

	])
	.run([function() {
		console.log("CKEditor AM Timetable widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

