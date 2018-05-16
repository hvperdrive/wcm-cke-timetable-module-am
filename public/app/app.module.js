(function(angular) {
	angular.module("cke-timetable-am_0.0.1.factories", []);
	angular.module("cke-timetable-am_0.0.1.services", ["cke-timetable-am_0.0.1.factories"]);
	angular.module("cke-timetable-am_0.0.1.controllers", ["cke-timetable-am_0.0.1.services"]);
	angular.module("cke-timetable-am_0.0.1.directives", ["cke-timetable-am_0.0.1.controllers"]);

	angular.module("cke-timetable-am_0.0.1", [

		"pelorus.services",

		"cke-timetable-am_0.0.1.factories",
		"cke-timetable-am_0.0.1.services",
		"cke-timetable-am_0.0.1.controllers",
		"cke-timetable-am_0.0.1.directives",

	])
	.run([function() {
		console.log("CKEditor AM Timetable widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

