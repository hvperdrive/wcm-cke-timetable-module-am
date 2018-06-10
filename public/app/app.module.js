(function(angular) {
	angular.module("cke-timetable-am_0.0.3.factories", []);
	angular.module("cke-timetable-am_0.0.3.services", ["cke-timetable-am_0.0.3.factories"]);
	angular.module("cke-timetable-am_0.0.3.controllers", ["cke-timetable-am_0.0.3.services"]);
	angular.module("cke-timetable-am_0.0.3.directives", ["cke-timetable-am_0.0.3.controllers"]);

	angular.module("cke-timetable-am_0.0.3", [

		"pelorus.services",

		"cke-timetable-am_0.0.3.factories",
		"cke-timetable-am_0.0.3.services",
		"cke-timetable-am_0.0.3.controllers",
		"cke-timetable-am_0.0.3.directives",

	])
	.run([function() {
		console.log("CKEditor AM Timetable widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

