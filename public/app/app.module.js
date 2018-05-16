(function(angular) {
	angular.module("cke-timetable-am_0.0.2.factories", []);
	angular.module("cke-timetable-am_0.0.2.services", ["cke-timetable-am_0.0.2.factories"]);
	angular.module("cke-timetable-am_0.0.2.controllers", ["cke-timetable-am_0.0.2.services"]);
	angular.module("cke-timetable-am_0.0.2.directives", ["cke-timetable-am_0.0.2.controllers"]);

	angular.module("cke-timetable-am_0.0.2", [

		"pelorus.services",

		"cke-timetable-am_0.0.2.factories",
		"cke-timetable-am_0.0.2.services",
		"cke-timetable-am_0.0.2.controllers",
		"cke-timetable-am_0.0.2.directives",

	])
	.run([function() {
		console.log("CKEditor AM Timetable widget is loaded and available! (module)"); // eslint-disable-line no-console
	}]);
})(window.angular);

