(function(angular) {
	angular.module("cke-timetable-am_0.0.5.factories", []);
	angular.module("cke-timetable-am_0.0.5.services", ["cke-timetable-am_0.0.5.factories"]);
	angular.module("cke-timetable-am_0.0.5.controllers", ["cke-timetable-am_0.0.5.services"]);
	angular.module("cke-timetable-am_0.0.5.directives", ["cke-timetable-am_0.0.5.controllers"]);

	angular.module("cke-timetable-am_0.0.5", [

		"pelorus.services",

		"cke-timetable-am_0.0.5.factories",
		"cke-timetable-am_0.0.5.services",
		"cke-timetable-am_0.0.5.controllers",
		"cke-timetable-am_0.0.5.directives",

	])
	.run([function() {
		console.log("CKEditor AM Timetable widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

